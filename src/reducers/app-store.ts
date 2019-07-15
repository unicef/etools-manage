import { makeReducer } from 'utils';
import { onGetSectionsSuccess, onCreateSectionSuccess, onResetCreatedSection, onThrowError, onSetLoading } from 'actions';


export const appStoreReducer = makeReducer({
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
