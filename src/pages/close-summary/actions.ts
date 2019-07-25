
import { createAction } from 'redux-starter-kit';
import { BackendService } from 'services/backend';
import { StoreDispatch } from 'contexts/app';
import StorageService from 'services/storage';
import { ZippedEntityResults } from 'entities/types';
import { onSetLoading } from 'actions';
import { zipObj, keys } from 'ramda';
import { entityHandlers } from 'entities';
import { getProperty } from 'utils/helpers';

export const onModuleEntitiesDataSuccess = createAction('moduleEntitiesDataSuccess');

export const onFetchModulesEntities = async (services: {backendService: BackendService; storageService: StorageService}, payload: string, dispatch: StoreDispatch) => {
    console.log('TCL: onFetchModulesEntities -> onFetchModulesEntities', onFetchModulesEntities);
    const { backendService, storageService } = services;

    const entitiesData = storageService.getStoredEntitiesData(payload);

    if (!entitiesData) {
        dispatch(onSetLoading(true));
        const rawEntitiesData = await backendService.getEntitiesForClose(payload);
        if (rawEntitiesData) {
            const processedEntitiesData = zipObj(
                keys(rawEntitiesData),

                keys(rawEntitiesData).map(
                    (key: keyof ZippedEntityResults) => {
                        const handler = getProperty(entityHandlers, key);
                        const data = getProperty(rawEntitiesData, key);
                        // @ts-ignore  TODO: figure out the typing for data !
                        return handler(data, Number(payload));
                    }
                ));
            console.log('TCL: onFetchModulesEntities -> processedEntitiesData', processedEntitiesData);


        }
    }

    dispatch(onModuleEntitiesDataSuccess(entitiesData));
};

export const onEditModuleSections = (payload: string, dispatch: StoreDispatch) => {
    //
};


