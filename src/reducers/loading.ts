import { createSlice } from 'redux-starter-kit';
import { onFetchForCloseSuccess } from './close-section-payload';
import { onSuccessCloseSection } from './closed-section-success';
import { onGetSectionsSuccess } from './sections';
import { onSetMergedSection } from './merged-section';
import { onCreateSectionSuccess } from './created-section';


export const loading = createSlice({
    initialState: false,
    reducers: {
        requestStarted: (state, action) => true
    },
    extraReducers: {
        [onFetchForCloseSuccess.type]: (state, action) => false,
        [onSuccessCloseSection.type]: (state, action) => false,
        [onSetMergedSection.type]: (state, action) => false,
        [onCreateSectionSuccess.type]: (state, action) => false,
        [onGetSectionsSuccess.type]: (state, action) => false
    }
});
export const { requestStarted } = loading.actions;
export const { reducer: loadingReducer } = loading;
