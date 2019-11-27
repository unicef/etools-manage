import { zipObj, filter, prop, flatten, keys, flip, compose } from 'ramda';
import BaseService from 'services';
import { notEmpty } from 'utils';
import {
    Intervention,
    Travel,
    ActionPoint,
    TPMActivity,
    Indicator,
    NonEmptyEntityResults,
    Normalized,
    AllEntities
} from 'entities/types';
import { normalize } from 'normalizr';
import {
    interventionSchema,
    travelsSchema,
    tpmActivitiesSchema,
    actionPointsSchema
} from 'entities/schemas';

export interface BackendService {
    getIndicators(interventions: Normalized<Intervention>): Indicator[];
    getTravels(query: string): Promise<Normalized<Travel>>;
    getTPMActivities(query: string): Promise<Normalized<TPMActivity>>;
    getActionPoints(query: string): Promise<Normalized<ActionPoint>>;
    getEntitiesForMerge(query: string): Promise<NonEmptyEntityResults>;
    getZippedEntities(query: string): Promise<NonEmptyEntityResults>;
    getEntitiesForClose(query: string): Promise<NonEmptyEntityResults>;
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

// TODO: Add type guards on all api responses
export default class BackendApiService extends BaseService implements BackendService {
    private entityApiMap: AllAffectedEntities = {
        tpmActivities: this.getTPMActivities.bind(this),
        actionPoints: this.getActionPoints.bind(this),
        interventions: this.getInterventions.bind(this),
        travels: this.getTravels.bind(this)
    };

    public async getInterventions(query: string): Promise<Normalized<Intervention>> {
        try {
            const url = `${process.env.REACT_APP_INTERVENTIONS_APPLIED_INDICATORS_ENDPOINT}${query}`;
            const response = await this._http.get<Intervention>(url);
            const { entities } = normalize(response, [interventionSchema]);
            return entities.interventions;
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
            const { data } = await this._http.get<TravelsResponse>(url);
            const { entities } = normalize(data, [travelsSchema]);

            return entities.travels;
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

            const { entities } = normalize(response, [tpmActivitiesSchema]);

            return entities.tpmActivities;
        } catch (err) {
            return {};
        }
    }

    public async getActionPoints(query: string): Promise<Normalized<ActionPoint>> {
        try {
            const url = `${process.env.REACT_APP_ACTION_POINTS_ENDPOINT}${query}`;
            const { results: response } = await this._http.get<BackendResponse<ActionPoint>>(url);

            const { entities } = normalize(response, [actionPointsSchema]);
            return entities.actionPoints;
        } catch (err) {
            return {};
        }
    }

    public async getEntitiesForMerge(query: string): Promise<NonEmptyEntityResults> {
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

    public async getEntitiesForClose(query: string): Promise<NonEmptyEntityResults> {
        try {
            const zipped = await this.getZippedEntities(query);
            return filter(notEmpty, zipped);
        } catch (err) {
            throw err;
        }
    }

    public async getZippedEntities(query: string): Promise<NonEmptyEntityResults> {
        const zip = zipObj(Object.keys(this.entityApiMap));
        const allEntities = await Promise.all(
            Object.keys(this.entityApiMap).map(entity => this.entityApiMap[entity](query))
        );
        return zip(allEntities);
    }
}
