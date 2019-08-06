
import { BackendService } from 'services/backend';
import StorageService, { StorageData } from 'services/storage';
import { ZippedEntityResults, InterventionSectionPayload, InterventionEntity, IndicatorsPayload, GenericSectionPayload } from 'entities/types';

import { Dispatch } from 'global-types';
import { onSetLoading, onSetModuleEditingName, onCurrentActiveSection, onFetchForCloseSuccess, onFetchFromStorageSuccess, onThrowError, onChangeInterventionSection, onUpdateInterventionIndicatorsState, onUpdateTravelSection, onUpdateActionPointSection } from 'slices/root-store';


export const onFetchDataCloseSection = async (
    services: {backendService: BackendService; storageService: StorageService},
    payload: string, dispatch: Dispatch) => {

    dispatch(onCurrentActiveSection(Number(payload)));

    const { backendService, storageService } = services;

    const dataFromStorage = storageService.getStoredEntitiesData(`close_${payload}`);
    let dataFromServer: Partial<ZippedEntityResults>;

    if (!dataFromStorage) {
        dispatch(onSetLoading(true));
        try {
            dataFromServer = await backendService.getEntitiesForClose(payload);
        } catch (err) {
            dispatch(onThrowError(err.message));
            return;
        }

        dispatch(onFetchForCloseSuccess(dataFromServer));

    } else {
        dispatch(onFetchFromStorageSuccess(dataFromStorage));
    }

    dispatch(onCurrentActiveSection(Number(payload)));
};

export const onEditModuleSections = (payload: string, dispatch: Dispatch) => {
    dispatch(onSetModuleEditingName(payload));
};

export const onSelectInterventionSection = (payload: InterventionSectionPayload, dispatch: Dispatch) => {
    dispatch(onChangeInterventionSection(payload));
};

export const onSelectIndicatorSection = (payload: IndicatorsPayload, dispatch: Dispatch) => {
    dispatch(onUpdateInterventionIndicatorsState(payload));
};

export const onSelectTravelSection = (payload: GenericSectionPayload, dispatch: Dispatch) => {
    dispatch(onUpdateTravelSection(payload));
};

export const onSelectActionPointSection = (payload: GenericSectionPayload, dispatch: Dispatch) => {
    dispatch(onUpdateActionPointSection(payload));
};
