import { makeReducer } from 'utils';
import { onGetSectionsSuccess, onCreateSectionSuccess, onResetCreatedSection } from 'actions';


export const appStoreReducer = makeReducer({
    [onGetSectionsSuccess.type]: (state, action) => {
        state.sections = action.payload;
    },
    [onCreateSectionSuccess.type]: (state, action) => {
        state.createdSection = action.payload;
    },
    [onResetCreatedSection.type]: state => {
        state.createdSection = null;
    }
});
