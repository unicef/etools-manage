
import { SectionsService } from 'services/section';
import { sectionWithNumberId } from 'utils/helpers';
import { BackendService } from 'services/backend';
import { isSectionsParamValid } from 'pages/merge-summary';
import { CreateSectionPayload, MergeSectionsPayload, NonEmptyEntityResults } from 'entities/types';
import { onSetLoading, onGetSectionsSuccess, onSetMergedSection, onCreateSectionSuccess, onThrowError } from 'slices/root-store';
import { Dispatch } from 'global-types';
import { createAction } from 'redux-starter-kit';

export const onSectionTableRender = createAction('onSectionTableRender');

export const onGetSections = async (service: SectionsService, dispatch: Dispatch) => {
    let sections;
    try {
        dispatch(onSetLoading(true));
        sections = await service.getSections();
    } catch (error) {
        throw error;
    }

    sections = sections.map(sectionWithNumberId);

    dispatch(onSetLoading(false));
    dispatch(onGetSectionsSuccess(sections));
};

export const onSubmitMergeSections = async (service: SectionsService, payload: MergeSectionsPayload, dispatch: Dispatch) => {
    dispatch(onSetLoading(true));

    try {
        const newSectionFromMerged = await service.mergeSections(payload);
        dispatch(onSetMergedSection(newSectionFromMerged));
    } catch (err) {
        dispatch(onThrowError(err));
    }

};

export const onSubmitCreateSection = async(service: SectionsService, payload: CreateSectionPayload, dispatch: Dispatch): Promise<Error | void> => {
    dispatch(onSetLoading(true));
    let newSection;
    try {
        newSection = await service.createSection(payload);
    } catch (error) {
        dispatch(onSetLoading(false));
        return error;
    }
    dispatch(onCreateSectionSuccess(newSection));
};

export const onFetchMergeSummary = async(service: BackendService, payload: string, dispatch: Dispatch) => {

    if (!isSectionsParamValid(payload)) {
        dispatch(onThrowError('Invalid sections provided for merge'));
        return;
    }

    dispatch(onSetLoading(true));

    let summary: NonEmptyEntityResults;

    try {
        summary = await service.getEntitiesForMerge(payload);
        dispatch(onSetLoading(false));
        return summary;

    } catch (err) {
        dispatch(onThrowError(err));
    }

};
