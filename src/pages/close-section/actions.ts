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
    onChangeAllInterventionSection,
    onUpdateInterventionIndicatorsState,
    onUpdateTravelSection,
    onUpdateAllTravelSection,
    onUpdateActionPointSection,
    onUpdateTPMSections,
    onUpdateAllTPMSections,
    onUpdateFMActivitySections,
    onUpdateAllFMActivitySections,
    onUpdateFMQuestionSections,
    onUpdateAllFMQuestionSections,
    onUpdateAllActionPointSection,
    engagementAllSectionSelected,
    onUpdatePartnerSection,
    onUpdateAllPartnerSection,
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

export const onSelectAllInterventionSection = (payload: GenericMultiSectionPayload, dispatch: Dispatch) => {
    dispatch(onChangeAllInterventionSection(payload));
};

export const onSelectIndicatorSection = (payload: IndicatorsPayload) => (dispatch: Dispatch) => {
    dispatch(onUpdateInterventionIndicatorsState(payload));
};

export const onSelectTravelSection = (payload: GenericSectionPayload, dispatch: Dispatch) => {
    dispatch(onUpdateTravelSection(payload));
};

export const onSelectAllTravelSection = (payload: string, dispatch: Dispatch) => {
    dispatch(onUpdateAllTravelSection(payload));
};

export const onSelectActionPointSection = (payload: GenericSectionPayload, dispatch: Dispatch) => {
    dispatch(onUpdateActionPointSection(payload));
};

export const onSelectAllActionPointSection = (payload: string, dispatch: Dispatch) => {
    dispatch(onUpdateAllActionPointSection(payload));
};

export const onSelectTPMSections = (payload: GenericSectionPayload, dispatch: Dispatch) => {
    dispatch(onUpdateTPMSections(payload));
};

export const onSelectAllTPMSections = (payload: string, dispatch: Dispatch) => {
    dispatch(onUpdateAllTPMSections(payload));
};

export const onSelectFMActivitySections = (payload: GenericMultiSectionPayload, dispatch: Dispatch) => {
    dispatch(onUpdateFMActivitySections(payload));
};

export const onSelectAllFMActivitySections = (payload: GenericMultiSectionPayload, dispatch: Dispatch) => {
    dispatch(onUpdateAllFMActivitySections(payload));
};

export const onSelectFMQuestionSections = (payload: GenericMultiSectionPayload, dispatch: Dispatch) => {
    dispatch(onUpdateFMQuestionSections(payload));
};

export const onSelectAllFMQuestionSections = (payload: GenericMultiSectionPayload, dispatch: Dispatch) => {
    dispatch(onUpdateAllFMQuestionSections(payload));
};

export const onEngagementAllSectionSelected = (payload: GenericMultiSectionPayload, dispatch: Dispatch) => {
    dispatch(engagementAllSectionSelected(payload));
};

export const onSelectPartnerSection = (payload: GenericSectionPayload, dispatch: Dispatch) => {
    dispatch(onUpdatePartnerSection(payload));
};

export const onSelectAllPartnerSection = (payload: string, dispatch: Dispatch) => {
    dispatch(onUpdateAllPartnerSection(payload));
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
