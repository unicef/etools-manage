import { EntitiesAffected } from 'entities/types';
import { keys } from 'ramda';
import { SPLIT_SECTION_PREFIX, CLOSE_SECTION_PREFIX } from 'global-constants';

export interface StorageClient {
    setItem: (key: string, value: string) => void;
    getItem: (key: string) => string | null;
    removeItem: (key: string) => void;
}

interface CloseData {
    [id: string]: EntitiesAffected;
}
interface SplitData {
    [id: string]: {
        newName: string;
        resolvedData: EntitiesAffected;
    };
}

export type StorageData = CloseData | SplitData;

abstract class BaseStorage {
    protected _storage: StorageClient;
    public constructor(client: StorageClient) {
        this._storage = client;
    }
}

export interface Storage {
    storeEntitiesData(key: string, data: EntitiesAffected): void;
    getStoredEntitiesData(key: string): EntitiesAffected | null;
    getAllItems(): string[] | null;
    removeItem(key: string): void;
}

export default class StorageService extends BaseStorage implements Storage {
    public storeEntitiesData(key: string, data: EntitiesAffected) {
        const json = JSON.stringify(data);
        this._storage.setItem(key, json);
    }

    public getStoredEntitiesData(key: string): EntitiesAffected | null {
        const data = this._storage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }

    public removeItem(key: string): void {
        this._storage.removeItem(key);
    }

    public getAllItems(): string[] | null {
        const relatedKeys = keys(this._storage).filter(
            (key: string) =>
                key.includes(CLOSE_SECTION_PREFIX) || key.includes(SPLIT_SECTION_PREFIX)
        );

        return relatedKeys;
    }
}
