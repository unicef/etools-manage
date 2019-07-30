import { NonEmptyEntityResults, AnyKeyVal } from 'entities/types';
import { firstValue, firstKey } from 'utils';

export interface StorageClient {
    setItem: (key: string, value: string) => void;
    getItem: (key: string) => string | null;
}

abstract class BaseStorage {
    protected _storage: StorageClient
    public constructor(client: StorageClient) {
        this._storage = client;
    }
}


export interface Storage {
    storeEntitiesData({ key, value }: AnyKeyVal): void;
    getStoredEntitiesData(key: string): NonEmptyEntityResults | null;
}

export default class StorageService extends BaseStorage implements Storage {

    public storeEntitiesData(data: AnyKeyVal) {
        const json = JSON.stringify(firstValue(data));
        this._storage.setItem(firstKey(data), json);
    }

    public getStoredEntitiesData(key: string): NonEmptyEntityResults | null {
        const data = this._storage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }
}
