import { onGetSectionsSuccess, onCreateSectionSuccess, onResetCreatedSection, onThrowError, onSetLoading, onSetMergedSection } from 'actions';
import { createReducer } from 'redux-starter-kit';
import { initialState } from 'contexts/app';
import { onModuleEntitiesDataSuccess, onSetModuleEditingName } from 'pages/close-summary/actions';


export const appStoreReducer = createReducer(initialState, {
    [onGetSectionsSuccess.type]: (state, action) => {
        state.sections = action.payload;
    },
    [onCreateSectionSuccess.type]: (state, action) => {
        state.createdSection = action.payload;
        state.loading = false;
    },
    [onResetCreatedSection.type]: state => {
        state.createdSection = null;
    },
    [onThrowError.type]: (state, action) => {
        state.error = action.payload;
    },
    [onSetLoading.type]: (state, action) => {
        state.loading = action.payload;
    },
    [onSetMergedSection.type]: (state, action) => {
        state.mergedSection = action.payload;
        state.loading = false;
    },
    [onModuleEntitiesDataSuccess.type]: (state, action) => {
        state.currentInProgressEntitiesData = action.payload;
        state.loading = false;
    },
    [onSetModuleEditingName.type]: (state, action) => {
        state.moduleEditingName = action.payload;
    }
});
