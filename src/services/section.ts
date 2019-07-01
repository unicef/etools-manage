import { SectionEntity } from 'entities/section';
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
        // const response = await this._http.get<SectionEntity[]>(process.env.SECTIONS_ENDPOINT);
        // return response;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    { id: 0, name: 'Health Nutrition' },
                    { id: 1, name: 'Education' }
                ]);
            }, 200);
        });
    }

    public async createSection(data: SectionEntity): Promise<SectionEntity> {
        const response = await this._http.post<SectionEntity>(
            process.env.SECTIONS_ENDPOINT,
            {
                body: data
            }
        );
        return response;
    }

    public async closeSection(id: number): Promise<void> {
        const response = await this._http.post<any>(
            process.env.SECTION_CLOSE_ENDPOINT,
            {
                body: {
                    id
                }
            }
        );

        return response;
    }
}
