import { BackendService } from 'services/backend';
import StorageService from 'services/storage';
import {
    EntitiesAffected,
    GenericMultiSectionPayload,
    IndicatorsPayload,
    GenericSectionPayload,
    CloseSectionBackendPayload,
    FetchStoragePayload
} from 'entities/types';
import { Dispatch } from 'redux';
import { SectionsService } from 'services/section';
import {
    closeSectionDataReceived,
    dataFromStorageReceived,
    onChangeInterventionSection,
    onUpdateInterventionIndicatorsState,
    onUpdateTravelSection,
    onUpdateActionPointSection,
    onUpdateTPMSections
} from 'slices/close-section-payload';
import { currentActiveSectionChanged } from 'slices/current-active-section';
import { requestStarted } from 'slices/loading';
import { onThrowError } from 'slices/error';
import { onSetModuleEditingName } from 'slices/module-editing-name';
import { onSuccessCloseSection } from 'slices/closed-section-success';
import { getCloseSectionPrefixKey } from 'lib/sections';
import { ActionBarKeys } from './types';
import { setCloseSectionActionBar, onSetViewCloseSummary } from 'slices/ui';

export const onFetchDataCloseSection = (
    services: { backendService: BackendService; storageService: StorageService },
    payload: FetchStoragePayload
) => async (dispatch: Dispatch) => {
    dispatch(currentActiveSectionChanged(Number(payload.id)));

    const { backendService, storageService } = services;
    const key = getCloseSectionPrefixKey(payload);

    const dataFromStorage = storageService.getStoredEntitiesData(key);

    if (!dataFromStorage) {
        let dataFromServer: Partial<EntitiesAffected>;
        dispatch(requestStarted());
        try {
            dataFromServer = await backendService.getEntitiesForClose(payload.id);
        } catch (err) {
            dispatch(onThrowError(err.message));
            return;
        }
        dispatch(closeSectionDataReceived(dataFromServer));
    } else {
        dispatch(dataFromStorageReceived(dataFromStorage));
    }
};

export const onEditModuleSections = (payload: string, dispatch: Dispatch) => {
    dispatch(onSetModuleEditingName(payload));
};

export const onSelectInterventionSection = (payload: GenericMultiSectionPayload) => (
    dispatch: Dispatch
) => {
    dispatch(onChangeInterventionSection(payload));
};

export const onSelectIndicatorSection = (payload: IndicatorsPayload) => (dispatch: Dispatch) => {
    dispatch(onUpdateInterventionIndicatorsState(payload));
};

export const onSelectTravelSection = (payload: GenericSectionPayload, dispatch: Dispatch) => {
    dispatch(onUpdateTravelSection(payload));
};

export const onSelectActionPointSection = (payload: GenericSectionPayload, dispatch: Dispatch) => {
    dispatch(onUpdateActionPointSection(payload));
};

export const onSelectTPMSections = (payload: GenericSectionPayload, dispatch: Dispatch) => {
    dispatch(onUpdateTPMSections(payload));
};

export const onSubmitCloseSection = (
    service: SectionsService,
    payload: CloseSectionBackendPayload
) => async (dispatch: Dispatch) => {
    try {
        dispatch(requestStarted());
        await service.closeSection(payload);
    } catch (err) {
        dispatch(onThrowError(err.message));
        return;
    }
    dispatch(onSuccessCloseSection());
};

export const onSetActionBar = (dispatch: Dispatch, payload: ActionBarKeys | '') => {
    dispatch(setCloseSectionActionBar(payload));
};

export const onSelectShowReview = (dispatch: Dispatch) => {
    dispatch(onSetViewCloseSummary(true));
};

export const onSelectHideReview = (dispatch: Dispatch) => {
    dispatch(onSetViewCloseSummary(false));
};
