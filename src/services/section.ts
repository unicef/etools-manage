import BaseService from 'services';
import { SuccessResponse } from 'global-types';
import {
    Section,
    CreateSectionPayload,
    MergeSectionsPayload,
    SectionServicePayload,
    NewSectionFromMerged,
    CloseSectionBackendPayload
} from 'entities/types';

export interface SectionsService {
    getSections(): Promise<Section[]>;
    createSection(data: CreateSectionPayload): Promise<SuccessResponse>;
    mergeSections(payload: MergeSectionsPayload): Promise<NewSectionFromMerged>;
    closeSection(payload: CloseSectionBackendPayload): Promise<Response>;
}

const getSectionsUrl = process.env.REACT_APP_SECTIONS_ENDPOINT as string;
const createSectionUrl = process.env.REACT_APP_SECTIONS_CREATE_ENDPOINT as string;
const mergeSectionUrl = process.env.REACT_APP_SECTIONS_MERGE_ENDPOINT as string;

export default class SectionsApiService extends BaseService implements SectionsService {
    private bodyFromPayload(payload: SectionServicePayload) {
        return {
            body: JSON.stringify(payload)
        };
    }
    public async getSections(): Promise<Section[]> {
        try {
            const response = await this._http.get<Section[]>(getSectionsUrl);
            return response;
        } catch (err) {
            throw new Error(err);
        }
    }

    public async createSection(payload: CreateSectionPayload): Promise<SuccessResponse> {
        try {
            const response = await this._http.post<SuccessResponse>(
                createSectionUrl,
                this.bodyFromPayload(payload)
            );
            return response;
        } catch (err) {
            throw err;
        }
    }

    public async mergeSections(payload: MergeSectionsPayload): Promise<NewSectionFromMerged> {
        try {
            const response = await this._http.post<NewSectionFromMerged>(
                mergeSectionUrl,
                this.bodyFromPayload(payload)
            );
            return response;
        } catch (err) {
            throw err;
        }
    }

    public async closeSection(payload: CloseSectionBackendPayload): Promise<Response> {
        try {
            const response = await this._http.post<Response>(
                process.env.REACT_APP_SECTIONS_CLOSE_ENDPOINT as string,
                this.bodyFromPayload(payload)
            );
            return response;
        } catch (err) {
            throw err;
        }
    }
}
