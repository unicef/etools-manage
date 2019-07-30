
import { BackendService } from 'services/backend';
import StorageService from 'services/storage';
import { ZippedEntityResults, AnyKeyVal } from 'entities/types';
import { zipObj, keys } from 'ramda';
import { getEntityHandlers } from 'entities';
import { Dispatch } from 'global-types';
import { onSetLoading, onModuleEntitiesDataSuccess, onSetModuleEditingName, updateCloseSectionPayload } from 'slices/root-store';


export const onFetchModulesEntities = async (services: {backendService: BackendService; storageService: StorageService}, payload: string, dispatch: Dispatch) => {
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
        dispatch(onModuleEntitiesDataSuccess({ [payload]: entitiesData }));
    }

};

export const onEditModuleSections = (payload: string, dispatch: Dispatch) => {
    dispatch(onSetModuleEditingName(payload));
};

export const onUpdatePayload = (storageService: StorageService, payload: AnyKeyVal, dispatch: Dispatch) => {
    storageService.storeEntitiesData(payload);
    dispatch(updateCloseSectionPayload(payload));
};

