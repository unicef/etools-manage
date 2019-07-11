import { zipObj } from 'ramda';
import BaseService from 'services';
import { ActionPointEntity } from 'entities/actionpoint-entity';
import { TPMActivityEntity } from 'entities/tpmactivity-entity';

export interface BackendService {
    // getInterventions(query: string): Promise<InterventionEntity[]>; TODO: probably not needed since applied indicator returns what we need ?
    getIndicators(query: string): Promise<Response>;
    getTravels(query: string): Promise<Response>;
    getTPMActivity(query: string): Promise<TPMActivityEntity[]>;
    getActionPoints(query: string): Promise<ActionPointEntity[]>;
    getAllEntities(query: string): Promise<Response[]>;
}

export interface BackendResponse {
    count: number;
    next: string;
    results: any[];
}

export default class BackendApiService extends BaseService implements BackendService {

    public async getIndicators(query: string): Promise<Response> {
        try {
            const url = `${process.env.REACT_APP_INTERVENTIONS_APPLIED_INDICATORS_ENDPOINT}?sections=${query}`;
            const response = await this._http.get<Response>(url);
            return response;
        } catch (err) {
            throw new Error(err);
        }
    }

    public async getTravels(query: string): Promise<Response> {
        try {
            const url = `${process.env.REACT_APP_TAVELS_ENDPOINT}?f_section=${query}`;
            const response = await this._http.get<Response>(url);
            return response;
        } catch (err) {
            const json = JSON.parse(err.message);
            throw new Error(`An error occurred retreiving travels for the requested sections: ${query}. Response code: ${json.code}`);
        }
    }

    public async getTPMActivity(query: string): Promise<TPMActivityEntity[]> {
        try {
            const url = `${process.env.REACT_APP_TPM_ACTIVITIES_ENDPOINT}?tpm_activities__section__in=${query}`;
            const response = await this._http.get<BackendResponse>(url);
            return response.results;
        } catch (err) {
            throw new Error(err);
        }
    }

    public async getActionPoints(query: string): Promise<ActionPointEntity[]> {
        try {
            const url = `${process.env.REACT_APP_ACTION_POINTS_ENDPOINT}/?section__in=${query}`;
            const response = await this._http.get<BackendResponse>(url);
            return response.results;
        } catch (err) {
            throw new Error(err);
        }
    }

    public async getAllEntities(query: string): Promise<Response[]> {
        const zip = zipObj(['indicators', 'tpmActivities', 'actionPoints']);
        const allEntities = await Promise.all([
            this.getIndicators(query),
            // this.getTravels(query),
            this.getTPMActivity(query),
            this.getActionPoints(query)
        ]);
        return zip(allEntities);

    }

}
