import SectionsApiService, { SectionsService } from 'services/section';
import { AppMiddleware } from 'global-types';
import { ApiClient } from './http';
import { onGetSections, refreshSectionsList } from 'actions';
import { onCreateSectionSuccess } from 'reducers/created-section';

const fetchLatestSectionsMiddleware = (service: SectionsService): AppMiddleware => {
    return () => dispatch => action => {
        dispatch(action);

        const sectionJustCreated = action.type === onCreateSectionSuccess.type;
        const sectionTableWasRendered = action.type === refreshSectionsList.type;
        if (sectionJustCreated || sectionTableWasRendered) {
            onGetSections(service, dispatch);
        }


    };
};


export default fetchLatestSectionsMiddleware(new SectionsApiService(new ApiClient()));
