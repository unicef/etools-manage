import { combineReducers } from 'redux';
import { closeSectionPayloadReducer } from 'slices/close-section-payload';
import { sectionsReducer } from 'slices/sections';
import { createdSectionReducer } from 'slices/created-section';
import { mergedSectionReducer } from 'slices/merged-section';
import { errorReducer } from 'slices/error';
import { loadingReducer } from 'slices/loading';
import { moduleEditingNameReducer } from 'slices/module-editing-name';
import { cuurentActiveSectionReducer } from 'slices/current-active-section';
import { closedSectionSuccessReducer } from 'slices/closed-section-success';
import { uiReducer } from 'slices/ui';
import { userReducer } from './user';
import { namesFromSplitReducer } from './names-from-split';
import { inProgressItemsReducer } from './in-progress-items';

const rootReducer = combineReducers({
    closeSectionPayload: closeSectionPayloadReducer,
    sections: sectionsReducer,
    createdSection: createdSectionReducer,
    mergedSection: mergedSectionReducer,
    error: errorReducer,
    loading: loadingReducer,
    moduleEditingName: moduleEditingNameReducer,
    currentActiveSectionId: cuurentActiveSectionReducer,
    closedSectionSuccess: closedSectionSuccessReducer,
    ui: uiReducer,
    user: userReducer,
    sectionsFromSplit: namesFromSplitReducer,
    inProgressItems: inProgressItemsReducer
});

export default rootReducer;
