import { combineReducers } from 'redux';
import { closeSectionPayloadReducer } from 'reducers/close-section-payload';
import { sectionsReducer } from 'reducers/sections';
import { createdSectionReducer } from 'reducers/created-section';
import { mergedSectionReducer } from 'reducers/merged-section';
import { errorReducer } from 'reducers/error';
import { loadingReducer } from 'reducers/loading';
import { moduleEditingNameReducer } from 'reducers/module-editing-name';
import { cuurentActiveSectionReducer } from 'reducers/current-active-section';
import { closedSectionSuccessReducer } from 'reducers/closed-section-success';
import { uiReducer } from 'reducers/ui';
import { userReducer } from './user';
import { namesFromSplitReducer } from './names-from-split';


const reducer = combineReducers({
    closeSectionPayload: closeSectionPayloadReducer,
    sections: sectionsReducer,
    createdSection: createdSectionReducer,
    mergedSection: mergedSectionReducer,
    error: errorReducer,
    loading: loadingReducer,
    moduleEditingName: moduleEditingNameReducer,
    currentActiveSection: cuurentActiveSectionReducer,
    closedSectionSuccess: closedSectionSuccessReducer,
    ui: uiReducer,
    user: userReducer,
    namesFromSplit: namesFromSplitReducer
});

export default reducer;
