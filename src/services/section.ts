import BaseService from 'services';

export interface SectionsService {
    getSections(): Promise<Response>;
    createSection(data: Response): Promise<Response>;
    closeSection(id: number): Promise<Response>; // TODO: check response on close and create type
}


export default class SectionsApiService extends BaseService implements SectionsService {

    public async getSections(): Promise<Response> {
        try {
            const response = await this._http.get<Response>(process.env.REACT_APP_SECTIONS_ENDPOINT);
            return response;

        } catch (err) {
            throw new Error(err);
        }
    }

    public async createSection(data: Response): Promise<Response> {
        try {
            const response = await this._http.post<Response>(
                process.env.REACT_APP_SECTIONS_ENDPOINT,
                {
                    body: JSON.stringify(data)
                }
            );
            return response;

        } catch (err) {
            throw new Error(err);
        }
    }

    public async closeSection(id: number): Promise<Response> {
        try {
            const response = await this._http.post<Response>(
                process.env.SECTION_CLOSE_ENDPOINT,
                {
                    body: JSON.stringify({ id })
                }
            );

            return response;

        } catch (err) {
            throw new Error(err);
        }
    }
}
