import { zipObj, filter, prop, flatten } from 'ramda';
import BaseService from 'services';
import { TravelEntity } from 'entities/travel-entity';
import { notEmpty } from 'utils/helpers';
import { InterventionEntity, ActionPointEntity, TPMActivityEntity, ZippedEntityResults } from 'entities/types';

export interface BackendService {
    getIndicators(query: string): Promise<InterventionEntity[]>;
    getTravels(query: string): Promise<TravelEntity[]>;
    getTPMActivities(query: string): Promise<TPMActivityEntity[]>;
    getActionPoints(query: string): Promise<ActionPointEntity[]>;
    getAllAffectedEntities(query: string): Promise<NonEmptyEntityResults>;
}

export interface BackendResponse<T> {
    count: number;
    next: string;
    results: T[];
}

export type EntityUnion = InterventionEntity[] | TPMActivityEntity[] | ActionPointEntity[] |TravelEntity[]

export interface AllAffectedEntities {
    [key: string]: (query: string) => Promise<EntityUnion>;
}

export type NonEmptyEntityResults = Partial<ZippedEntityResults>

// TODO: Add type guards on all api responses
export default class BackendApiService extends BaseService implements BackendService {

    private entityApiMap: AllAffectedEntities= {
        tpmActivities: this.getTPMActivities.bind(this),
        actionPoints: this.getActionPoints.bind(this),
        interventions: this.getInterventions.bind(this)
        // travels: this.getTravels.bind(this)
    }

    public async getInterventions(query: string): Promise<InterventionEntity[]> {
        try {
            const url = `${process.env.REACT_APP_INTERVENTIONS_APPLIED_INDICATORS_ENDPOINT}${query}`;
            const response = await this._http.get<InterventionEntity[]>(url);
            return response;
        } catch (err) {
            const json = JSON.parse(err.message);
            throw new Error(`An error occurred retreiving travels for the requested sections: ${query}. Response code: ${json.code}`);
        }
    }

    public getIndicators(interventions: InterventionEntity[]) {
        return flatten(interventions.map(prop('indicators')).filter(notEmpty));
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

    public async getAllAffectedEntities(query: string): Promise<NonEmptyEntityResults> {
        const zip = zipObj(Object.keys(this.entityApiMap));
        const allEntities = await Promise.all(
            Object.keys(this.entityApiMap).map(
                entity => this.entityApiMap[entity](query)
            )
        );
        const zipped = zip(allEntities);
        zipped.indicators = this.getIndicators(zipped.interventions);
        console.log('TCL: BackendApiService -> zipped', zipped);
        return filter(notEmpty, zipped);
    }

}
