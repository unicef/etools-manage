import { createAction } from 'redux-starter-kit';
import { BackendService } from 'services/backend';
import StorageService from 'services/storage';
import { FetchStoragePayload, NewSectionFromSplitPayload } from 'entities/types';
import { Dispatch, AnyAction } from 'redux';
import { getSplitSectionPrefixKey } from 'lib/sections';
import { onFetchDataCloseSection } from 'pages/close-section/actions';
import { updateNamesFromSplit } from 'reducers/names-from-split';
import { ThunkDispatch } from 'redux-thunk';

export const persistToStorage = createAction('persistToStorage');

export const onFetchDataSplitSection = async (
    services: { backendService: BackendService; storageService: StorageService },
    payload: FetchStoragePayload
) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const { storageService } = services;

    const splitKey = getSplitSectionPrefixKey(payload);

    const newNamesFromSplit = storageService.getStoredEntitiesData(splitKey);
    dispatch(updateNamesFromSplit(newNamesFromSplit));

    dispatch(onFetchDataCloseSection(services, payload));
};

export const onSectionSplit = (dispatch: Dispatch, payload: NewSectionFromSplitPayload[]) => {
    dispatch(persistToStorage(payload));
};
