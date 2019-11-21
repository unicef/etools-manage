import { AppMiddleware } from 'global-types';
import { closeSectionDataReceived, updateCloseSectionPayload } from 'slices/close-section-payload';
import { selectWithoutCurrentSection } from 'selectors/filter-sections';

// removes the section to be closed from options
export const filterCurrentSectionMiddleware: AppMiddleware = ({
    getState
}) => dispatch => action => {
    dispatch(action);

    if (action.type === closeSectionDataReceived.type) {
        const state = getState();
        const withoutCurrent = selectWithoutCurrentSection(state);
        dispatch(updateCloseSectionPayload(withoutCurrent));
    }
};
