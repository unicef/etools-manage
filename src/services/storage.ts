import { NonEmptyEntityResults, StorageKey, StorageKeyVal, ModuleEntities } from 'entities/types';
import { firstValue, firstKey } from 'utils';

export interface StorageClient {
    setItem: (key: string, value: string) => void;
    getItem: (key: string) => string | null;
}

interface CloseData {
    [id: string]: ModuleEntities;
}
interface SplitData {
    [id: string]: {
        newName: string;
        resolvedData: ModuleEntities;
    };
}

export type StorageData = CloseData | SplitData

abstract class BaseStorage {
    protected _storage: StorageClient
    public constructor(client: StorageClient) {
        this._storage = client;
    }
}

export interface Storage {
    storeEntitiesData(key: string, data: StorageData): void;
    getStoredEntitiesData(key: StorageKey): StorageData | null;
}

export default class StorageService extends BaseStorage implements Storage {

    public storeEntitiesData(key: string, data: StorageData) {
        const json = JSON.stringify(data);
        this._storage.setItem(key, json);
    }

    public getStoredEntitiesData(key: string): StorageData | null {
        const data = this._storage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }
}
