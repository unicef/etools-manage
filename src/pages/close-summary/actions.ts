
import { createAction } from 'redux-starter-kit';
import { BackendService } from 'services/backend';
import { StoreDispatch } from 'contexts/app';
import StorageService from 'services/storage';
import { NonEmptyEntityResults } from 'entities/types';
import { onSetLoading } from 'actions';

export const onModuleEntitiesDataSuccess = createAction('moduleEntitiesDataSuccess');

export const onFetchModulesEntities = async (services: {backendService: BackendService; storageService: StorageService}, payload: string, dispatch: StoreDispatch) => {
    const { backendService, storageService } = services;

    let entitiesData: NonEmptyEntityResults | null;
    entitiesData = storageService.getStoredEntitiesData(payload);

    if (!entitiesData) {
        dispatch(onSetLoading(true));
        entitiesData = await backendService.getEntitiesForClose(payload);
    }

    dispatch(onModuleEntitiesDataSuccess(entitiesData));
};
