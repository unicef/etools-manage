
import { BackendService } from 'services/backend';
import StorageService from 'services/storage';
import { ZippedEntityResults, StorageKeyVal } from 'entities/types';

import { Dispatch } from 'global-types';
import { onSetLoading, onSetModuleEditingName, updateCloseSectionPayload, onCurrentActiveSection, onFetchForCloseSuccess, onFetchFromStorageSuccess } from 'slices/root-store';


export const onFetchDataCloseSection = async (
    services: {backendService: BackendService; storageService: StorageService},
    payload: string, dispatch: Dispatch) => {

    dispatch(onCurrentActiveSection(Number(payload)));

    const { backendService, storageService } = services;

    const dataFromStorage = storageService.getStoredEntitiesData('close');

    if (!dataFromStorage) {
        dispatch(onSetLoading(true));
        const dataFromServer: Partial<ZippedEntityResults> = await backendService.getEntitiesForClose(payload);

        dispatch(onFetchForCloseSuccess(dataFromServer));

    } else {
        dispatch(onFetchFromStorageSuccess(dataFromStorage));
    }

    dispatch(onCurrentActiveSection(Number(payload)));


};

export const onEditModuleSections = (payload: string, dispatch: Dispatch) => {
    dispatch(onSetModuleEditingName(payload));
};

export const onUpdatePayload = (storageService: StorageService, payload: StorageKeyVal, dispatch: Dispatch) => {
    storageService.storeEntitiesData(payload);
    dispatch(updateCloseSectionPayload(payload));
};

