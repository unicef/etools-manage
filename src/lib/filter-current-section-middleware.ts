import { AppMiddleware } from 'global-types';
import { onFetchForCloseSuccess, updateCloseSectionPayload } from 'reducers/close-section-payload';
import { selectWithoutCurrentSection } from 'selectors/filter-sections';

// removes the section to be closed from options
export const filterCurrentSectionMiddleware: AppMiddleware = ({ getState }) => dispatch => action => {
    dispatch(action);

    if (action.type === onFetchForCloseSuccess.type) {
        const state = getState();
        const withoutCurrent = selectWithoutCurrentSection(state);
        dispatch(updateCloseSectionPayload(withoutCurrent));
    }
};
