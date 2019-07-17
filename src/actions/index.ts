import { createAction } from 'redux-starter-kit';

import { SectionsService } from 'services/section';
import { sectionWithNumberId } from 'utils/helpers';
import { BackendService, NonEmptyEntityResults } from 'services/backend';
import { StoreDispatch } from 'contexts/app';
import { isSectionsParamValid } from 'pages/merge-summary';
import { SectionPayload } from 'entities/types';

export const onToggleAddModal = createAction('modals/toggleAdd');
export const onToggleSplitModal = createAction('modals/toggleSplit');
export const onToggleMergeModal = createAction('modals/toggleMerge');

export const onGetSectionsSuccess = createAction('entity/getSectionsSuccess');
export const onCreateSectionSuccess = createAction('entity/createSectionSuccess');
export const onResetCreatedSection = createAction('entity/resetCreateSuccess');
export const onMergeSections = createAction('entity/mergeSections');
export const onSelectForMerge = createAction('entity/selectForMerge');
export const onSetLoading = createAction('loading');
export const onThrowError = createAction('error');


export const onGetSections = async (service: SectionsService, dispatch: StoreDispatch) => {
    let sections;
    try {
        dispatch(onSetLoading(true));
        sections = await service.getSections();
    } catch (error) {
        throw new Error(error);
    }

    sections = sections.map(sectionWithNumberId);
    dispatch(onSetLoading(false));

    dispatch(onGetSectionsSuccess(sections));
};

// export const onSubmitMergeSections = async (service: SectionsService, payload, dispatch) => {
//     console.log('TCL: onSubmitMergeSections -> payload', payload);
//     // ....
// };

export const onSubmitCreateSection = async(service: SectionsService, payload: SectionPayload, dispatch: StoreDispatch) => {
    dispatch(onSetLoading(true));
    let newSection;
    try {
        newSection = await service.createSection(payload);
    } catch (error) {
        throw new Error(error);
    }
    dispatch(onCreateSectionSuccess(newSection));
    dispatch(onSetLoading(true));
};

export const onFetchMergeSummary = async(service: BackendService, payload: string, dispatch: StoreDispatch) => {

    if (!isSectionsParamValid(payload)) {
        dispatch(onThrowError('Invalid sections provided for merge'));
        return;
    }

    dispatch(onSetLoading(true));

    let summary: NonEmptyEntityResults;

    try {
        summary = await service.getAllAffectedEntities(payload);
        // console.log('TCL: onFetchMergeSummary -> summary', summary);
        dispatch(onSetLoading(false));
        return summary;
        // dispatch(onMergeSummarySuccess(summary));

    } catch (err) {
        dispatch(onThrowError(err));
    }

};
