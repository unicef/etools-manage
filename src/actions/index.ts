import { createAction } from 'redux-starter-kit';

import { SectionsService } from 'services/section';
import { sectionWithNumberId } from 'utils/helpers';

export const onRequestStarted = createAction('requestStarted');
export const onToggleAddModal = createAction('modals/toggleAdd');
export const onToggleSplitModal = createAction('modals/toggleSplit');
export const onToggleMergeModal = createAction('modals/toggleMerge');

export const onGetSectionsSuccess = createAction('entity/getSectionsSuccess');
export const onCreateSectionSuccess = createAction('entity/createSectionSuccess');
export const onResetCreatedSection = createAction('entity/resetCreateSuccess');
export const onMergeSections = createAction('entity/mergeSections');
export const onSelectForMerge = createAction('entity/selectForMerge');
export const onToggleLoading = createAction('loading');

export const onGetSections = async (service: SectionsService, dispatch) => {
    let sections;
    try {
        dispatch(onRequestStarted());
        sections = await service.getSections();
    } catch (error) {
        throw new Error(error);
    }

    sections = sections.map(sectionWithNumberId);

    dispatch(onGetSectionsSuccess(sections));
};

export const onSubmitMergeSections = async (service: SectionsService, payload, dispatch) => {
    console.log('TCL: onSubmitMergeSections -> payload', payload);
    // ....
};

export const onSubmitAddSection = async(service: SectionsService, payload, dispatch) => {
    dispatch(onRequestStarted());
    let newSection;
    try {
        newSection = await service.createSection(payload);
    } catch (error) {
        throw new Error(error);
    }
    dispatch(onCreateSectionSuccess(newSection));
};
