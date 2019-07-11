// import { InterventionEntity } from 'entities/intervention-entity';
import BaseService from 'services';

export interface BackendService {
    // getInterventions(query: number[]): Promise<InterventionEntity[]>; TODO: probably not needed since applied indicator returns what we need ?
    getIndicators(query: number[]): Promise<Response>;
    getTravels(query: number[]): Promise<Response>;
    getTPMActivity(query: number[]): Promise<Response>;
    getActionPoints(query: number[]): Promise<Response>;
}

export default class BackendApiService extends BaseService implements BackendService {


    public async getIndicators(query: number[]): Promise<Response> {
        try {
            const url = `${process.env.REACT_APP_INTERVENTIONS_APPLIED_INDICATORS_ENDPOINT}?sections=${query.join(',')}`;
            const response = await this._http.get<Response>(url);
            return response;
        } catch (err) {
            throw new Error(err);
        }
    }

    public async getTravels(query: number[]): Promise<Response> {
        try {
            const url = `${process.env.REACT_APP_TAVELS_ENDPOINT}?f_section=${query.join(',')}`;
            const response = await this._http.get<Response>(url);
            return response;
        } catch (err) {
            throw new Error(err);
        }
    }

    public async getTPMActivity(query: number[]): Promise<Response> {
        try {
            const url = `${process.env.REACT_APP_TPM_ACTIVITIES_ENDPOINT}?tpm_activities__section__in=${query.join(',')}`;
            const response = await this._http.get<Response>(url);
            return response;
        } catch (err) {
            throw new Error(err);
        }
    }

    public async getActionPoints(query: number[]): Promise<Response> {
        try {
            const url = `${process.env.REACT_APP_ACTION_POINTS_ENDPOINT}/?section__in=${query.join(',')}`;
            const response = await this._http.get<Response>(url);
            return response;
        } catch (err) {
            throw new Error(err);
        }
    }
}
