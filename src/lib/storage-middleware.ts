import { AppMiddleware } from 'global-types';
import { includes } from 'ramda';
import { prefixWithClose } from './sections';
import StorageService, { Storage } from 'services/storage';
import { onUpdateTravelSection, onChangeInterventionSection, onUpdateActionPointSection, onUpdateInterventionIndicatorsState, onUpdateTPMSections } from 'reducers/close-section-payload';
import { onSuccessCloseSection } from 'reducers/closed-section-success';

const USER_SELECTION_ACTIONS = [
    onChangeInterventionSection.type,
    onUpdateTravelSection.type,
    onUpdateActionPointSection.type,
    onUpdateInterventionIndicatorsState.type,
    onUpdateTPMSections.type
];

const storageMiddleware = (service: Storage): AppMiddleware => {
    return ({ getState }) => dispatch => action => {
        dispatch(action);

        const state = getState();

        if (includes(action.type, USER_SELECTION_ACTIONS)) {
            const key = prefixWithClose((state.currentActiveSection as number).toString());
            service.storeEntitiesData(key, state.closeSectionPayload);
        }
        const sectionJustClosed = action.type === onSuccessCloseSection.type && action.payload === true;

        if (sectionJustClosed) {
            const key = prefixWithClose((state.currentActiveSection as number).toString());
            service.removeItem(key);
        }

    };
};

export default storageMiddleware(new StorageService(localStorage));
