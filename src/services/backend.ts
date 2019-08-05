import { zipObj, filter, prop, flatten, keys, flip, compose } from 'ramda';
import BaseService from 'services';
import { notEmpty } from 'utils/helpers';
import { InterventionEntity, TravelEntity, ActionPointEntity, TPMActivityEntity, IndicatorEntity, NonEmptyEntityResults, Normalized, AllEntities } from 'entities/types';
import { normalize } from 'normalizr';
import { interventionSchema, travelsSchema, tpmActivitiesSchema, actionPointsSchema } from 'entities/schemas';

export interface BackendService {
    getIndicators(interventions: Normalized<IndicatorEntity>): IndicatorEntity[];
    getTravels(query: string): Promise<Normalized<TravelEntity>>;
    getTPMActivities(query: string): Promise<Normalized<TPMActivityEntity>>;
    getActionPoints(query: string): Promise<Normalized<ActionPointEntity>>;
    getEntitiesForMerge(query: string): Promise<NonEmptyEntityResults>;
    getZippedEntities(query: string): Promise<NonEmptyEntityResults>;
    getEntitiesForClose(query: string): Promise<NonEmptyEntityResults>;
    getInterventions(query: string): Promise<Normalized<InterventionEntity>>;
}

export interface BackendResponse<T> {
    count: number;
    next: string;
    results: T[];
}

export interface TravelsResponse {
    data: TravelEntity[];
}

export interface AllAffectedEntities {
    [key: string]: (query: string) => Promise<Normalized<AllEntities>>;
}

// TODO: Add type guards on all api responses
export default class BackendApiService extends BaseService implements BackendService {

    private entityApiMap: AllAffectedEntities= {
        tpmActivities: this.getTPMActivities.bind(this),
        actionPoints: this.getActionPoints.bind(this),
        interventions: this.getInterventions.bind(this),
        travels: this.getTravels.bind(this)
    }

    public async getInterventions(query: string): Promise<Normalized<InterventionEntity>> {
        try {
            const url = `${process.env.REACT_APP_INTERVENTIONS_APPLIED_INDICATORS_ENDPOINT}${query}`;
            const response = await this._http.get<InterventionEntity>(url);
            const { entities } = normalize(response, [interventionSchema]);
            return entities.interventions;


        } catch (err) {
            const json = JSON.parse(err.message);
            throw new Error(`An error occurred retreiving travels for the requested sections: ${query}. Response code: ${json.code}`);
        }
    }

    public getIndicators(interventions: Normalized<IndicatorEntity>): IndicatorEntity[] {
        const lookup = flip(prop);
        return flatten(keys(interventions).map(compose(prop('indicators'), lookup(interventions))).filter(notEmpty));
    }

    public async getTravels(query: string): Promise<Normalized<TravelEntity>> {
        try {
            const url = `${process.env.REACT_APP_TAVELS_ENDPOINT}${query}`;
            const { data } = await this._http.get<TravelsResponse>(url);
            const { entities } = normalize(data, [travelsSchema]);

            return entities.travels;

        } catch (err) {
            const json = JSON.parse(err.message);
            throw new Error(`An error occurred retreiving travels for the requested sections: ${query}. Response code: ${json.code}`);
        }
    }

    public async getTPMActivities(query: string): Promise<Normalized<TPMActivityEntity>> {
        try {
            const url = `${process.env.REACT_APP_TPM_ACTIVITIES_ENDPOINT}${query}`;
            const { results: response } = await this._http.get<BackendResponse<TPMActivityEntity>>(url);

            const { entities } = normalize(response, [tpmActivitiesSchema]);

            return entities.tpmActivities;

        } catch (err) {
            const json = JSON.parse(err.message);
            throw new Error(`An error occurred retreiving travels for the requested sections: ${query}. Response code: ${json.code}`);
        }
    }

    public async getActionPoints(query: string): Promise<Normalized<ActionPointEntity>> {
        try {
            const url = `${process.env.REACT_APP_ACTION_POINTS_ENDPOINT}${query}`;
            const { results: response } = await this._http.get<BackendResponse<ActionPointEntity>>(url);

            const { entities } = normalize(response, [actionPointsSchema]);
            return entities.actionPoints;

        } catch (err) {
            const json = JSON.parse(err.message);
            throw new Error(`An error occurred retreiving travels for the requested sections: ${query}. Response code: ${json.code}`);
        }
    }

    public async getEntitiesForMerge(query: string): Promise<NonEmptyEntityResults> {
        const zipped = await this.getZippedEntities(query);
        let withIndicators;
        if ('interventions' in zipped) {
            withIndicators = {
                ...zipped,
                indicators: this.getIndicators(zipped.interventions as Normalized<InterventionEntity>)
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
            Object.keys(this.entityApiMap).map(
                entity => this.entityApiMap[entity](query)
            )
        );
        return zip(allEntities);
    }


}
