import { createAction } from 'redux-starter-kit';

import { SectionsService } from 'services/section';

export const onToggleAddModal = createAction('modals/toggleAdd');
export const onToggleSplitModal = createAction('modals/toggleSplit');
export const onGetSectionsSuccess = createAction('entity/getSectionsSuccess');

function sectionWithNumberId(section) {
    return ({
        ...section,
        id: Number(section.id)
    });
}

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
