import { createAction } from 'redux-starter-kit';

import { SectionsService } from 'services/section';
import { sectionWithNumberId } from 'utils/helpers';

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

    sections = sections.map(sectionWithNumberId);

    dispatch(onGetSectionsSuccess(sections));

};
