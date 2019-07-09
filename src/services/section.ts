import { SectionEntity } from 'entities/section-entity';
import { HttpClient } from 'lib/http';

export interface SectionsService {
    getSections(): Promise<SectionEntity[]>;
    createSection(data: SectionEntity): Promise<SectionEntity>;
    closeSection(id: number): Promise<any>; // TODO: check response on close and create type
}


export default class SectionsApiService implements SectionsService {

    private _http: HttpClient;

    public constructor(client: HttpClient) {
        this._http = client;
    }

    public async getSections(): Promise<SectionEntity[]> {
        try {
            const response = await this._http.get<SectionEntity[]>(process.env.REACT_APP_SECTIONS_ENDPOINT);
            return response;

        } catch (err) {
            throw new Error(err);
        }
    }

    public async createSection(data: SectionEntity): Promise<SectionEntity> {
        try {
            const response = await this._http.post<SectionEntity>(
                process.env.SECTIONS_ENDPOINT,
                {
                    body: data
                }
            );
            return response;

        } catch (err) {
            throw new Error(err);
        }
    }

    public async closeSection(id: number): Promise<void> {
        try {
            const response = await this._http.post<any>(
                process.env.SECTION_CLOSE_ENDPOINT,
                {
                    body: {
                        id
                    }
                }
            );

            return response;

        } catch (err) {
            throw new Error(err);
        }
    }
}
