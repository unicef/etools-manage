import { createAction } from 'redux-starter-kit';
import { BackendService } from 'services/backend';
import StorageService from 'services/storage';
import { FetchStoragePayload, NewSectionFromSplitPayload } from 'entities/types';
import { Dispatch } from 'global-types';
import { newSectionsCreated } from 'reducers/sections';
import { getSplitSectionPrefixKey } from 'lib/sections';
import { onFetchDataCloseSection } from 'pages/close-section/actions';

export const persistToStorage = createAction('persistToStorage')

export const onFetchDataSplitSection = async (
  services: {backendService: BackendService; storageService: StorageService},
  payload: FetchStoragePayload, dispatch: Dispatch) => {

    const { storageService } = services;
    
    const splitKey = getSplitSectionPrefixKey(payload);
  
    const newNamesFromSplit = storageService.getStoredEntitiesData(splitKey);
    dispatch(newSectionsCreated(newNamesFromSplit));

    onFetchDataCloseSection(services, payload,dispatch);

  }

export const onSectionSplit = (dispatch: Dispatch, payload: NewSectionFromSplitPayload[]) => {
    dispatch(persistToStorage(payload))
}


