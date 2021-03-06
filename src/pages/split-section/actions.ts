import { createAction } from '@reduxjs/toolkit';
import { BackendService } from 'services/backend';
import StorageService from 'services/storage';
import { FetchStoragePayload, NewSectionFromSplitPayload } from 'entities/types';
import { Dispatch, AnyAction } from 'redux';
import { getSplitSectionPrefixKey } from 'lib/sections';
import { onFetchDataCloseSection } from 'pages/close-section/actions';
import { updateNamesFromSplit } from 'slices/names-from-split';
import { ThunkDispatch } from 'redux-thunk';

export const persistToStorage = createAction<NewSectionFromSplitPayload[]>('persistToStorage');

export const onFetchDataSplitSection = (
    services: { backendService: BackendService; storageService: StorageService },
    payload: FetchStoragePayload
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const { storageService } = services;

    const splitKey = getSplitSectionPrefixKey(payload);

    const newNamesFromSplit = storageService.getStoredEntitiesData<NewSectionFromSplitPayload[]>(
        splitKey
    );
    dispatch(updateNamesFromSplit(newNamesFromSplit));

    dispatch(onFetchDataCloseSection(services, payload));
};

export const onSectionSplit = (payload: NewSectionFromSplitPayload[]) => (dispatch: Dispatch) => {
    dispatch(persistToStorage(payload));
};
