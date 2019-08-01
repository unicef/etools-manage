
import { BackendService } from 'services/backend';
import StorageService, { StorageData } from 'services/storage';
import { ZippedEntityResults } from 'entities/types';

import { Dispatch } from 'global-types';
import { onSetLoading, onSetModuleEditingName, updateCloseSectionPayload, onCurrentActiveSection, onFetchForCloseSuccess, onFetchFromStorageSuccess } from 'slices/root-store';
import { firstValue, firstKey } from 'utils';
import { prefixWithClose } from 'lib/sections';


export const onFetchDataCloseSection = async (
    services: {backendService: BackendService; storageService: StorageService},
    payload: string, dispatch: Dispatch) => {

    dispatch(onCurrentActiveSection(Number(payload)));

    const { backendService, storageService } = services;

    const dataFromStorage = storageService.getStoredEntitiesData(`close_${payload}`);

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

export const onUpdatePayload = (storageService: StorageService, payload: StorageData, dispatch: Dispatch) => {
    const prefixedKey = prefixWithClose(firstKey(payload));
    storageService.storeEntitiesData(prefixedKey, firstValue(payload));
    dispatch(updateCloseSectionPayload(firstValue(payload)));
};

