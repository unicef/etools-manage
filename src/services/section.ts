import BaseService from 'services';
import { SectionEntity, SectionPayload } from 'entities/section-entity';
import { SuccessResponse } from 'global-types';

export interface SectionsService {
    getSections(): Promise<SectionEntity[]>;
    createSection(data: SectionPayload): Promise<SuccessResponse>;
    // closeSection(id: number): Promise<Response>; // TODO: check response on close and create type
}

const getSectionsUrl = process.env.REACT_APP_SECTIONS_ENDPOINT as string;
const createSectionUrl = process.env.REACT_APP_SECTIONS_CREATE_ENDPOINT as string;

export default class SectionsApiService extends BaseService implements SectionsService {

    public async getSections(): Promise<SectionEntity[]> {
        try {
            const response = await this._http.get<SectionEntity[]>(getSectionsUrl);
            return response;

        } catch (err) {
            throw new Error(err);
        }
    }

    public async createSection(data: SectionPayload): Promise<SuccessResponse> {
        try {
            const response = await this._http.post<SuccessResponse>(
                createSectionUrl,
                {
                    body: JSON.stringify(data)
                }
            );
            return response;

        } catch (err) {
            throw new Error(err);
        }
    }

    // public async closeSection(id: number): Promise<Response> {
    //     try {
    //         const response = await this._http.post<Response>(
    //             process.env.SECTION_CLOSE_ENDPOINT,
    //             {
    //                 body: JSON.stringify({ id })
    //             }
    //         );

    //         return response;

    //     } catch (err) {
    //         throw new Error(err);
    //     }
    // }
}
