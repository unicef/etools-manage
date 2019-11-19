import { createSlice } from '@reduxjs/toolkit';
import { onFetchForCloseSuccess } from './close-section-payload';
import { onSuccessCloseSection } from './closed-section-success';
import { onGetSectionsSuccess } from './sections';
import { onSetMergedSection } from './merged-section';
import { onCreateSectionSuccess } from './created-section';

export const loading = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        requestStarted: () => true,
        requestComplete: () => false
    },
    extraReducers: {
        [onFetchForCloseSuccess.type]: () => false,
        [onSuccessCloseSection.type]: () => false,
        [onSetMergedSection.type]: () => false,
        [onCreateSectionSuccess.type]: () => false,
        [onGetSectionsSuccess.type]: () => false
    }
});
export const { requestStarted, requestComplete } = loading.actions;
export const { reducer: loadingReducer } = loading;
