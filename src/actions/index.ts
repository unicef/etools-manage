import { createAction } from 'redux-starter-kit';

import { SectionsService } from 'services/section';

export const onToggleAddModal = createAction('modals/toggleAdd');
export const onToggleSplitModal = createAction('modals/toggleSplit');
export const onGetSectionsSuccess = createAction('entity/getSectionsSuccess');


export const onGetSections = async (service: SectionsService, dispatch) => {
    let sections;
    try {
        sections = await service.getSections();
    } catch (error) {
        throw new Error(error);
    }

    dispatch(onGetSectionsSuccess(sections));

};
