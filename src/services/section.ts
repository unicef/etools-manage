import BaseService from 'services';
import { SuccessResponse } from 'global-types';
import { SectionEntity, CreateSectionPayload, MergeSectionsPayload, SectionServicePayload, NewSectionFromMerged, CloseSectionBackendPayload } from 'entities/types';

export interface SectionsService {
    getSections(): Promise<SectionEntity[]>;
    createSection(data: CreateSectionPayload): Promise<SuccessResponse>;
    mergeSections(payload: MergeSectionsPayload): Promise<NewSectionFromMerged>;
    closeSection(payload: CloseSectionBackendPayload): Promise<Response>; // TODO: check response on close and create type
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
    public async getSections(): Promise<SectionEntity[]> {
        try {
            const response = await this._http.get<SectionEntity[]>(getSectionsUrl);
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
            throw new Error(err);
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
            throw new Error('Error merging sections');
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
            throw new Error(err);
        }
    }
}
