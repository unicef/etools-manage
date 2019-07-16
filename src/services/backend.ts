import { zipObj } from 'ramda';
import BaseService from 'services';
import { ActionPointEntity } from 'entities/actionpoint-entity';
import { TPMActivityEntity } from 'entities/tpmactivity-entity';
import { IndicatorEntity } from 'entities/indicator-entity';
import { TravelEntity } from 'entities/travel-entity';

export interface BackendService {
    // getInterventions(query: string): Promise<InterventionEntity[]>; TODO: probably not needed since applied indicator returns what we need ?
    getIndicators(query: string): Promise<IndicatorEntity[]>;
    getTravels(query: string): Promise<TravelEntity[]>;
    getTPMActivities(query: string): Promise<TPMActivityEntity[]>;
    getActionPoints(query: string): Promise<ActionPointEntity[]>;
    getAllAffectedEntities(query: string): Promise<Response[]>;
}

export interface BackendResponse<T> {
    count: number;
    next: string;
    results: T[];
}
export type EntityUnion = IndicatorEntity[] | TPMActivityEntity[] | ActionPointEntity[] |TravelEntity[]

export interface AllAffectedEntities {
    [key: string]: (query: string) => Promise<EntityUnion>;
}


export default class BackendApiService extends BaseService implements BackendService {

    private entityApiMap(): AllAffectedEntities {
        return {
            indicators: this.getIndicators.bind(this),
            tpmActivities: this.getTPMActivities.bind(this),
            actionPoints: this.getActionPoints.bind(this),
            travels: this.getTravels.bind(this)
        };
    }

    public async getIndicators(query: string): Promise<IndicatorEntity[]> {
        try {
            console.log('indicators this', this);
            const url = `${process.env.REACT_APP_INTERVENTIONS_APPLIED_INDICATORS_ENDPOINT}${query}`;
            const response = await this._http.get<IndicatorEntity[]>(url);
            return response;
        } catch (err) {
            throw new Error(err);
        }
    }

    public async getTravels(query: string): Promise<TravelEntity[]> {
        try {
            const url = `${process.env.REACT_APP_TAVELS_ENDPOINT}${query}`;
            const response = await this._http.get<TravelEntity[]>(url);
            return response;
        } catch (err) {
            const json = JSON.parse(err.message);
            throw new Error(`An error occurred retreiving travels for the requested sections: ${query}. Response code: ${json.code}`);
        }
    }

    public async getTPMActivities(query: string): Promise<TPMActivityEntity[]> {
        try {
            const url = `${process.env.REACT_APP_TPM_ACTIVITIES_ENDPOINT}${query}`;
            const response = await this._http.get<BackendResponse<TPMActivityEntity>>(url);
            return response.results;
        } catch (err) {
            const json = JSON.parse(err.message);
            throw new Error(`An error occurred retreiving travels for the requested sections: ${query}. Response code: ${json.code}`);
        }
    }

    public async getActionPoints(query: string): Promise<ActionPointEntity[]> {
        try {
            const url = `${process.env.REACT_APP_ACTION_POINTS_ENDPOINT}${query}`;
            const response = await this._http.get<BackendResponse<ActionPointEntity>>(url);
            return response.results;
        } catch (err) {
            const json = JSON.parse(err.message);
            throw new Error(`An error occurred retreiving travels for the requested sections: ${query}. Response code: ${json.code}`);
        }
    }

    public async getAllAffectedEntities(query: string): Promise<any> {
        const entityFetcher = this.entityApiMap();
        const zip = zipObj(Object.keys(entityFetcher));
        const allEntities = await Promise.all(
            Object.keys(entityFetcher).map(
                entity => entityFetcher[entity](query)
            )
        );
        return zip(allEntities);

    }


}
