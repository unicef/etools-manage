import SectionsApiService, { SectionsService } from 'services/section';
import { AppMiddleware } from 'global-types';
import { ApiClient } from './http';
import { onCreateSectionSuccess } from 'slices/root-store';
import { onGetSections, onSectionTableRender } from 'actions';

const fetchLatestSectionsMiddleware = (service: SectionsService): AppMiddleware => {
    return () => dispatch => action => {
        dispatch(action);

        const sectionJustCreated = action.type === onCreateSectionSuccess.type;
        const sectionTableWasRendered = action.type === onSectionTableRender.type;
        console.log('TCL: sectionTableWasRendered', sectionTableWasRendered);
        if (sectionJustCreated || sectionTableWasRendered) {
            console.log('TCL: sectionTableWasRendered', sectionTableWasRendered);
            onGetSections(service, dispatch);
        }


    };
};


export default fetchLatestSectionsMiddleware(new SectionsApiService(new ApiClient()));
