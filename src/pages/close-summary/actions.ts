
import { BackendService } from 'services/backend';
import StorageService from 'services/storage';
import { ZippedEntityResults, AnyKeyVal } from 'entities/types';

import { Dispatch } from 'global-types';
import { onSetLoading, onModuleEntitiesDataSuccess, onSetModuleEditingName, updateCloseSectionPayload, onCurrentActiveSection } from 'slices/root-store';


export const onFetchDataCloseSection = async (services: {backendService: BackendService; storageService: StorageService}, payload: string, dispatch: Dispatch) => {
    const { backendService, storageService } = services;

    const dataFromStorage = storageService.getStoredEntitiesData(payload);

    if (!dataFromStorage) {
        dispatch(onSetLoading(true));
        const dataFromServer: Partial<ZippedEntityResults> = await backendService.getEntitiesForClose(payload);

        dispatch(onModuleEntitiesDataSuccess(dataFromServer));

    } else {
        dispatch(onModuleEntitiesDataSuccess(dataFromStorage));
    }

    dispatch(onCurrentActiveSection(Number(payload)));


};

export const onEditModuleSections = (payload: string, dispatch: Dispatch) => {
    dispatch(onSetModuleEditingName(payload));
};

export const onUpdatePayload = (storageService: StorageService, payload: AnyKeyVal, dispatch: Dispatch) => {
    storageService.storeEntitiesData(payload);
    dispatch(updateCloseSectionPayload(payload));
};

