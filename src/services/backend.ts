import {zipObj, filter, prop, flatten, keys, flip, compose} from 'ramda';
import BaseService from 'services';
import {notEmpty} from 'utils';
import {
    Intervention,
    Travel,
    ActionPoint,
    TPMActivity,
    FMActivity,
    FMQuestion,
    Indicator,
    Normalized,
    AllEntities,
    Engagement,
    EntitiesAffected
} from 'entities/types';
import {normalize} from 'normalizr';
import {
    interventionSchema,
    travelsSchema,
    tpmActivitiesSchema,
    fmActivitiesSchema,
    fmQuestionsSchema,
    actionPointsSchema,
    engagementsSchema
} from 'entities/schemas';

export interface BackendService {
    getIndicators(interventions: Normalized<Intervention>): Indicator[];
    getTravels(query: string): Promise<Normalized<Travel>>;
    getTPMActivities(query: string): Promise<Normalized<TPMActivity>>;
    getActionPoints(query: string): Promise<Normalized<ActionPoint>>;

    getFMActivities(query: string): Promise<Normalized<FMActivity>>;
    getFMQuestions(query: string): Promise<Normalized<FMQuestion>>;

    getEntitiesForMerge(query: string): Promise<EntitiesAffected>;
    getZippedEntities(query: string): Promise<EntitiesAffected>;
    getEntitiesForClose(query: string): Promise<EntitiesAffected>;
    getInterventions(query: string): Promise<Normalized<Intervention>>;
}

export interface BackendResponse<T> {
    count: number;
    next: string;
    results: T[];
}

export interface TravelsResponse {
    data: Travel[];
}

export interface AllAffectedEntities {
    [key: string]: (query: string) => Promise<Normalized<AllEntities>>;
}

export default class BackendApiService extends BaseService implements BackendService {
    private entityApiMap: AllAffectedEntities = {
        tpmActivities: this.getTPMActivities.bind(this),
        actionPoints: this.getActionPoints.bind(this),

        fmActivities: this.getFMActivities.bind(this),
        fmQuestions: this.getFMQuestions.bind(this),

        interventions: this.getInterventions.bind(this),
        travels: this.getTravels.bind(this),
        engagements: this.getEngagements.bind(this)
    };

    public async getInterventions(query: string): Promise<Normalized<Intervention>> {
        try {
            const url = `${process.env.REACT_APP_INTERVENTIONS_APPLIED_INDICATORS_ENDPOINT}${query}`;
            const response = await this._http.get<Intervention>(url);
            const {entities} = normalize(response, [interventionSchema]);
            return entities.interventions as Normalized<Intervention>;
        } catch (err) {
            return {};
        }
    }

    public getIndicators(interventions: Normalized<Intervention>): Indicator[] {
        const lookup = flip(prop);
        return flatten(
            keys(interventions)
                .map(
                    compose(
                        prop('indicators'),
                        lookup(interventions)
                    )
                )
                .filter(notEmpty)
        );
    }

    public async getTravels(query: string): Promise<Normalized<Travel>> {
        try {
            const url = `${process.env.REACT_APP_TAVELS_ENDPOINT}${query}`;
            const {data} = await this._http.get<TravelsResponse>(url);
            const {entities} = normalize(data, [travelsSchema]);

            return entities.travels as Normalized<Travel>;
        } catch (err) {
            // We don't throw because some entities might not have a section as a FK, in which case an emtpy object will be filtered
            // out of the final summary results.
            return {};
        }
    }

    public async getTPMActivities(query: string): Promise<Normalized<TPMActivity>> {
        try {
            const url = `${process.env.REACT_APP_TPM_ACTIVITIES_ENDPOINT}${query}`;
            const response = await this._http.get<TPMActivity>(url);

            const {entities} = normalize(response, [tpmActivitiesSchema]);

            return entities.tpmActivities as Normalized<TPMActivity>;
        } catch (err) {
            return {};
        }
    }

    public async getActionPoints(query: string): Promise<Normalized<ActionPoint>> {
        try {
            const url = `${process.env.REACT_APP_ACTION_POINTS_ENDPOINT}${query}`;
            const {results: response} = await this._http.get<BackendResponse<ActionPoint>>(url);

            const {entities} = normalize(response, [actionPointsSchema]);
            return entities.actionPoints as Normalized<ActionPoint>;
        } catch (err) {
            return {};
        }
    }

    public async getFMActivities(query: string): Promise<Normalized<FMActivity>> {
        try {
            const url = `${process.env.REACT_APP_FM_ACTIVITIES_ENDPOINT}${query}`;
            const {results: response} = await this._http.get<BackendResponse<FMActivity>>(url);

            const {entities} = normalize(response, [fmActivitiesSchema]);
            return entities.fmActivities as Normalized<FMActivity>;
        } catch (err) {
            return {};
        }
    }

    public async getFMQuestions(query: string): Promise<Normalized<FMQuestion>> {
        try {
            const url = `${process.env.REACT_APP_FM_QUESTIONS_ENDPOINT}${query}`;
            const {results: response} = await this._http.get<BackendResponse<FMQuestion>>(url);

            const {entities} = normalize(response, [fmQuestionsSchema]);
            return entities.fmQuestions as Normalized<FMQuestion>;
        } catch (err) {
            return {};
        }
    }

    public async getEngagements(query: string): Promise<Normalized<Engagement>> {
        try {
            const url = `${process.env.REACT_APP_ENGAGEMENTS_ENDPOINT}${query}`;
            const {results: response} = await this._http.get<BackendResponse<Engagement>>(url);

            const {entities} = normalize(response, [engagementsSchema]);
            return entities.engagements as Normalized<Engagement>;
        } catch (err) {
            return {};
        }
    }

    public async getEntitiesForMerge(query: string): Promise<EntitiesAffected> {
        const zipped = await this.getZippedEntities(query);
        let withIndicators;
        if ('interventions' in zipped) {
            withIndicators = {
                ...zipped,
                indicators: this.getIndicators(zipped.interventions as Normalized<Intervention>)
            };
        }
        return filter(notEmpty, withIndicators);
    }

    public async getEntitiesForClose(query: string): Promise<EntitiesAffected> {
        try {
            const zipped = await this.getZippedEntities(query);
            return filter(notEmpty, zipped) as EntitiesAffected;
        } catch (err) {
            throw err;
        }
    }

    public async getZippedEntities(query: string): Promise<EntitiesAffected> {
        const zip = zipObj(Object.keys(this.entityApiMap));
        const allEntities = await Promise.all(
            Object.keys(this.entityApiMap).map(entity => this.entityApiMap[entity](query))
        );
        return zip(allEntities);
    }
}
