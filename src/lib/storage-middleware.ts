import { AppMiddleware } from 'global-types';
import { includes } from 'ramda';
import { prefixWithClose, prefixWithSplit } from './sections';
import StorageService, { Storage } from 'services/storage';
import { onUpdateTravelSection, onChangeInterventionSection, onUpdateActionPointSection, onUpdateInterventionIndicatorsState, onUpdateTPMSections } from 'reducers/close-section-payload';
import { onSuccessCloseSection } from 'reducers/closed-section-success';
import { persistToStorage } from 'pages/split-section/actions';


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
            const key = prefixWithClose(state);
            service.storeEntitiesData(key, state.closeSectionPayload);
        }

        if (action.type === persistToStorage.type){
            const key = prefixWithSplit(state);
            service.storeEntitiesData(key, action.payload)
        }

        const sectionJustClosed = action.type === onSuccessCloseSection.type && action.payload === true;

        if (sectionJustClosed) {
            const key = prefixWithClose(state);
            service.removeItem(key);
        }

    };
};

export default storageMiddleware(new StorageService(localStorage));
