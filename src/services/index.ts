import { HttpClient } from 'lib/http';
import { SectionsService } from './section';
import { BackendService } from './backend';


abstract class BaseService {
    protected _http: HttpClient;

    public constructor(client: HttpClient) {
        this._http = client;
    }
}

export interface AppServices {
    sectionsService: SectionsService;
    backendService: BackendService;
}

export default BaseService;
