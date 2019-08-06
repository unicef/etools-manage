import SectionsApiService, { SectionsService } from 'services/section';
import { AppMiddleware } from 'global-types';
import { ApiClient } from './http';
import { onSuccessCloseSection, onCreateSectionSuccess } from 'slices/root-store';
import { onGetSections } from 'actions';

const fetchLatestSectionsMiddleware = (service: SectionsService): AppMiddleware => {
    return () => dispatch => action => {
        dispatch(action);

        const sectionJustClosed = action.type === onSuccessCloseSection.type && action.payload === true;
        const sectionJustCreated = action.type === onCreateSectionSuccess.type;

        if (sectionJustClosed || sectionJustCreated) {
            onGetSections(service, dispatch);
        }


    };
};


export default fetchLatestSectionsMiddleware(new SectionsApiService(new ApiClient()));
