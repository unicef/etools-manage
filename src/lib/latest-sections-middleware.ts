import { ThunkDispatch } from 'redux-thunk';
import { AppMiddleware } from 'global-types';
import { onGetSections } from 'actions';
import { onCreateSectionSuccess } from 'reducers/created-section';
import { refreshSectionsList } from 'actions/action-constants';
import { AnyAction } from 'redux';

const fetchLatestSectionsMiddleware: AppMiddleware = () => (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => action => {
    dispatch(action);

    const sectionJustCreated = action.type === onCreateSectionSuccess.type;
    const sectionTableWasRendered = action.type === refreshSectionsList.type;
    if (sectionJustCreated || sectionTableWasRendered) {
        dispatch(onGetSections());
    }
};

export default fetchLatestSectionsMiddleware;
