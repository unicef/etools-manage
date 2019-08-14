
import { BackendService } from 'services/backend';
import StorageService from 'services/storage';
import { ZippedEntityResults, GenericMultiSectionPayload, IndicatorsPayload, GenericSectionPayload, CloseSectionBackendPayload, FetchStoragePayload } from 'entities/types';
import { Dispatch } from 'global-types';
import { SectionsService } from 'services/section';
import { updateCloseSectionPayload, onFetchForCloseSuccess, onFetchFromStorageSuccess, onChangeInterventionSection, onUpdateInterventionIndicatorsState, onUpdateTravelSection, onUpdateActionPointSection, onUpdateTPMSections } from 'reducers/close-section-payload';
import { onCurrentActiveSection } from 'reducers/current-active-section';
import { requestStarted } from 'reducers/loading';
import { onThrowError } from 'reducers/error';
import { onSetModuleEditingName } from 'reducers/module-editing-name';
import { onSuccessCloseSection } from 'reducers/closed-section-success';
import { getCloseSectionPrefixKey } from 'lib/sections';
import { ActionBarKeys } from './types';
import { setCloseSectionActionBar, reviewSelected } from 'reducers/ui';

export const onResetCloseSectionPayload = (dispatch: Dispatch) => {
    dispatch(updateCloseSectionPayload(null));
};


export const onFetchDataCloseSection = async (
    services: {backendService: BackendService; storageService: StorageService},
    payload: FetchStoragePayload, dispatch: Dispatch) => {
    dispatch(onCurrentActiveSection(Number(payload)));

    const { backendService, storageService } = services;
    const key = getCloseSectionPrefixKey(payload);

    const dataFromStorage = storageService.getStoredEntitiesData(key);
    if (!dataFromStorage) {

        let dataFromServer: Partial<ZippedEntityResults>;

        dispatch(requestStarted());
        try {
            dataFromServer = await backendService.getEntitiesForClose(payload.id);
        } catch (err) {
            dispatch(onThrowError(err.message));
            return;
        }

        dispatch(onFetchForCloseSuccess(dataFromServer));

    } else {
        dispatch(onFetchFromStorageSuccess(dataFromStorage));
    }

    dispatch(onCurrentActiveSection(Number(payload.id)));
};

export const onEditModuleSections = (payload: string, dispatch: Dispatch) => {
    dispatch(onSetModuleEditingName(payload));
};

export const onSelectInterventionSection = (payload: GenericMultiSectionPayload, dispatch: Dispatch) => {
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

export const onSelectTPMSections = (payload: GenericMultiSectionPayload, dispatch: Dispatch) => {
    dispatch(onUpdateTPMSections(payload));
};

export const onSubmitCloseSection = async (service: SectionsService, payload: CloseSectionBackendPayload, dispatch: Dispatch) => {
    try {
        dispatch(requestStarted());
        await service.closeSection(payload);
    } catch (err) {
        dispatch(onThrowError(err.message));
        return;
    }
    dispatch(onSuccessCloseSection());
};

export const onSetActionBar = (dispatch: Dispatch, payload: ActionBarKeys) => {
    dispatch(setCloseSectionActionBar(payload));
};

export const onSelectShowReview = (dispatch: Dispatch) => {
    dispatch(reviewSelected());
};
