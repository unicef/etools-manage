import { ModuleEntities } from 'entities/types';

export interface StorageClient {
    setItem: (key: string, value: string) => void;
    getItem: (key: string) => string | null;
    removeItem: (key:string) => void;
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
    storeEntitiesData(key: string, data: ModuleEntities): void;
    getStoredEntitiesData(key: string): ModuleEntities | null;
    removeItem(key: string): void;
}
export default class StorageService extends BaseStorage implements Storage {

    public storeEntitiesData(key: string, data: ModuleEntities) {
        const json = JSON.stringify(data);
        this._storage.setItem(key, json);
    }

    public getStoredEntitiesData(key: string): ModuleEntities | null {
        const data = this._storage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }

    public removeItem(key:string): void {
        this._storage.removeItem(key);
    }
}
