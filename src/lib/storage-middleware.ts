import { AppMiddleware } from 'global-types';
import { includes } from 'ramda';
import { prefixWithClose, prefixWithSplit } from './sections';
import StorageService, { Storage } from 'services/storage';
import {
    onUpdateTravelSection,
    onChangeInterventionSection,
    onUpdateActionPointSection,
    onUpdateInterventionIndicatorsState,
    onUpdateTPMSections,
    engagementSectionSelected
} from 'slices/close-section-payload';
import { onSuccessCloseSection } from 'slices/closed-section-success';
import { persistToStorage } from 'pages/split-section/actions';
import { removeItemFromInProgress, getInProgressSuccess } from 'slices/in-progress-items';

const SECTION_SELECTED_ACTIONS = [
    onChangeInterventionSection.type,
    onUpdateTravelSection.type,
    onUpdateActionPointSection.type,
    onUpdateInterventionIndicatorsState.type,
    onUpdateTPMSections.type,
    engagementSectionSelected.type
];

// This is where localStorage work is done after certain actions in order
// to save work-in-progress
const storageMiddleware = (service: Storage): AppMiddleware => {
    return ({ getState }) => dispatch => action => {
        dispatch(action);

        const state = getState();

        const sectionJustClosed = action.type === onSuccessCloseSection.type;
        const itemInProgressRemoved = action.type === removeItemFromInProgress.type;

        if (includes(action.type, SECTION_SELECTED_ACTIONS)) {
            const key = prefixWithClose(state);
            service.storeEntitiesData(key, state.closeSectionPayload);
            dispatch(getInProgressSuccess([key]));
        }

        if (action.type === persistToStorage.type) {
            const key = prefixWithSplit(state);
            service.storeEntitiesData(key, action.payload);
        }

        if (sectionJustClosed) {
            const closeKey = prefixWithClose(state);
            service.removeItem(closeKey);
            const splitKey = prefixWithSplit(state);
            service.removeItem(splitKey);
        }

        if (itemInProgressRemoved) {
            service.removeItem(action.payload);
        }
    };
};

export default storageMiddleware(new StorageService(localStorage));
