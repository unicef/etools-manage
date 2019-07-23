import { NonEmptyEntityResults } from 'entities/types';

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
    storeEntitiesData(key: string, value: NonEmptyEntityResults): void;
    getStoredEntitiesData(key: string): NonEmptyEntityResults | null;
}

export default class StorageService extends BaseStorage implements Storage {

    public storeEntitiesData(key: string, value: NonEmptyEntityResults) {
        const json = JSON.stringify(value);
        this._storage.setItem(key, json);
    }

    public getStoredEntitiesData(key: string): NonEmptyEntityResults | null {
        const data = this._storage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }
}
