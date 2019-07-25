
import { createAction } from 'redux-starter-kit';
import { BackendService } from 'services/backend';
import { StoreDispatch } from 'contexts/app';
import StorageService from 'services/storage';
import { ZippedEntityResults } from 'entities/types';
import { onSetLoading } from 'actions';
import { zipObj, keys } from 'ramda';
import { getHandler } from 'entities';
import { getProperty } from 'utils/helpers';

export const onModuleEntitiesDataSuccess = createAction('moduleEntitiesDataSuccess');

export const onFetchModulesEntities = async (services: {backendService: BackendService; storageService: StorageService}, payload: string, dispatch: StoreDispatch) => {
    const { backendService, storageService } = services;

    const entitiesData = storageService.getStoredEntitiesData(payload);

    if (!entitiesData) {
        dispatch(onSetLoading(true));
        const entitiesSectionsData = await backendService.getEntitiesForClose(payload);
        const processedEntitiesData = zipObj(
            keys(entitiesSectionsData),

            keys(entitiesSectionsData).map(
                (key: keyof ZippedEntityResults) => {
                    const data = getProperty(entitiesSectionsData, key);
                    const handler = getHandler(data, key);
                    return handler(data, Number(payload)); // TODO: figure out how to strict type the handler
                }
            ));

        dispatch(onModuleEntitiesDataSuccess(processedEntitiesData));

    } else {
        dispatch(onModuleEntitiesDataSuccess(entitiesData));
    }

};

export const onEditModuleSections = (payload: string, dispatch: StoreDispatch) => {
    //
};


