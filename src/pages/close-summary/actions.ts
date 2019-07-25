
import { createAction } from 'redux-starter-kit';
import { BackendService } from 'services/backend';
import { StoreDispatch } from 'contexts/app';
import StorageService from 'services/storage';
import { NonEmptyEntityResults, ZippedEntityResults, EntityCollectionUnion } from 'entities/types';
import { onSetLoading } from 'actions';
import EntityConfigMapping from 'entities/config-map';
import { zipObj, keys } from 'ramda';
import { entityHandlers, Result } from 'entities';
import { getProperty } from 'helpers';

export const onModuleEntitiesDataSuccess = createAction('moduleEntitiesDataSuccess');

export const onFetchModulesEntities = async (services: {backendService: BackendService; storageService: StorageService}, payload: string, dispatch: StoreDispatch) => {
    const { backendService, storageService } = services;

    const entitiesData = storageService.getStoredEntitiesData(payload);

    if (!entitiesData) {
        dispatch(onSetLoading(true));
        const rawEntitiesData = await backendService.getEntitiesForClose(payload);
        if (rawEntitiesData) {
            const processedEntitiesData = zipObj(
                keys(rawEntitiesData),

                Object.keys(rawEntitiesData).map(
                    (key: keyof ZippedEntityResults) => {
                        const handler = getProperty(entityHandlers, key);
                        const data = getProperty(rawEntitiesData, key);
                        return handler(data, Number(payload));
                    }
                ));


        }
    }

    dispatch(onModuleEntitiesDataSuccess(entitiesData));
};

export const onEditModuleSections = (payload: string, dispatch: StoreDispatch) => {
    //
};


