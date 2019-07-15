import { onGetSectionsSuccess, onCreateSectionSuccess, onResetCreatedSection, onThrowError, onSetLoading } from 'actions';
import { createReducer } from 'redux-starter-kit';
import { initialState } from 'contexts/app';


export const appStoreReducer = createReducer(initialState, {
    [onGetSectionsSuccess.type]: (state, action) => {
        state.sections = action.payload;
    },
    [onCreateSectionSuccess.type]: (state, action) => {
        state.createdSection = action.payload;
    },
    [onResetCreatedSection.type]: state => {
        state.createdSection = null;
    },
    [onThrowError.type]: (state, action) => {
        state.error = action.payload;
    },
    [onSetLoading.type]: (state, action) => {
        state.loading = action.payload;
    }
});
