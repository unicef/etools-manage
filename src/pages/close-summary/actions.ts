
import { createAction } from 'redux-starter-kit';
import { BackendService } from 'services/backend';
import { StoreDispatch } from 'contexts/app';
import StorageService from 'services/storage';
import { ZippedEntityResults } from 'entities/types';
import { onSetLoading } from 'actions';
import { zipObj, keys } from 'ramda';
import { getEntityHandlers } from 'entities';

export const onModuleEntitiesDataSuccess = createAction('moduleEntitiesDataSuccess');
export const onSetModuleEditingName = createAction('moduleEditingName');

export const onFetchModulesEntities = async (services: {backendService: BackendService; storageService: StorageService}, payload: string, dispatch: StoreDispatch) => {
    const { backendService, storageService } = services;

    const entitiesData = storageService.getStoredEntitiesData(payload);
    const entityHandlers = getEntityHandlers();

    if (!entitiesData) {
        dispatch(onSetLoading(true));
        const entitiesSectionsData: Partial<ZippedEntityResults> = await backendService.getEntitiesForClose(payload);
        const processedEntitiesData = zipObj(
            keys(entitiesSectionsData),

            keys(entitiesSectionsData).map(
                (key: keyof ZippedEntityResults) => {
                    const data = entitiesSectionsData[key];
                    const handler: Function = entityHandlers[key];
                    return handler(data, Number(payload)); //
                }
            ));

        dispatch(onModuleEntitiesDataSuccess({
            [payload]: processedEntitiesData
        }));

    } else {
        dispatch(onModuleEntitiesDataSuccess(entitiesData));
    }

};

export const onEditModuleSections = (payload: string, dispatch: StoreDispatch) => {
    console.log('TCL: onEditModuleSections -> payload', payload);
    //
    dispatch(onSetModuleEditingName(payload));
};

