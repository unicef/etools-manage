
import { SectionsService } from 'services/section';
import { sectionWithNumberId } from 'utils/helpers';
import { BackendService } from 'services/backend';
import { CreateSectionPayload, MergeSectionsPayload, NonEmptyEntityResults } from 'entities/types';
import { Dispatch } from 'global-types';
import { isSectionsParamValid } from 'lib/sections';
import { requestStarted } from 'reducers/loading';
import { onGetSectionsSuccess } from 'reducers/sections';
import { onSetMergedSection } from 'reducers/merged-section';
import { onThrowError } from 'reducers/error';
import { onCreateSectionSuccess } from 'reducers/created-section';
import wrappedFetch from 'lib/fetch';
import { onUserProfileSuccess } from 'reducers/user';


export const onGetSections = async (service: SectionsService, dispatch: Dispatch) => {
    let sections;
    try {
        dispatch(requestStarted());
        sections = await service.getSections();
    } catch (error) {
        throw error;
    }

    sections = sections.map(sectionWithNumberId);
    dispatch(onGetSectionsSuccess(sections));
};

export const onSubmitMergeSections = async (service: SectionsService, payload: MergeSectionsPayload, dispatch: Dispatch) => {
    dispatch(requestStarted());

    try {
        const newSectionFromMerged = await service.mergeSections(payload);
        dispatch(onSetMergedSection(newSectionFromMerged));
    } catch (err) {
        dispatch(onThrowError(err));
    }

};

export const onSubmitCreateSection = async(service: SectionsService, payload: CreateSectionPayload, dispatch: Dispatch): Promise<Error | void> => {
    dispatch(requestStarted());
    let newSection;
    try {
        newSection = await service.createSection(payload);
    } catch (error) {
        return error;
    }
    dispatch(onCreateSectionSuccess(newSection));
};

export const onFetchMergeSummary = async(service: BackendService, payload: string, dispatch: Dispatch) => {

    if (!isSectionsParamValid(payload)) {
        dispatch(onThrowError('Invalid sections provided for merge'));
        return;
    }

    dispatch(requestStarted());

    let summary: NonEmptyEntityResults;

    try {
        summary = await service.getEntitiesForMerge(payload);
        dispatch(requestStarted(false));
        return summary;

    } catch (err) {
        dispatch(onThrowError(err));
    }

};


export const fetchUserProfile = async(dispatch: Dispatch) => {
    dispatch(requestStarted());

    const data = await wrappedFetch(process.env.REACT_APP_USER_PROFILE_ENDPOINT as string);

    dispatch(onUserProfileSuccess(data));
};
