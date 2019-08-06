import { AppMiddleware } from 'global-types';
import { onChangeInterventionSection, onUpdateTravelSection, onUpdateActionPointSection, onUpdateTPMSections } from 'slices/root-store';
import { includes } from 'ramda';
import { prefixWithClose } from './sections';
import StorageService, { Storage } from 'services/storage';
import { ModuleEntities } from 'entities/types';

const USER_SELECTION_ACTIONS = [
    onChangeInterventionSection.type,
    onUpdateTravelSection.type,
    onUpdateActionPointSection.type,
    onUpdateTPMSections.type
];

const storageMiddleware = (service: Storage): AppMiddleware => {
    return ({ getState }) => dispatch => action => {
        dispatch(action);

        if (includes(action.type, USER_SELECTION_ACTIONS)) {
            const state = getState();
            const key = prefixWithClose((state.currentActiveSection as number).toString());
            service.storeEntitiesData(key, state.closeSectionPayload as ModuleEntities);
        }

    };
};

export default storageMiddleware(new StorageService(localStorage));
