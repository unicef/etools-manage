import { compose, filter } from 'ramda';
import SectionsApiService, { SectionsService } from 'services/section';
import { BackendService } from 'services/backend';
import { CreateSectionPayload, MergeSectionsPayload, EntitiesAffected } from 'entities/types';
import { Dispatch } from 'redux';
import {
    isSectionsParamValid,
    filterDuplicateClose,
    isCurrentCountry,
    sectionWithNumberId
} from 'lib/sections';
import { requestStarted, requestComplete } from 'slices/loading';
import { onGetSectionsSuccess } from 'slices/sections';
import { onSetMergedSection } from 'slices/merged-section';
import { onThrowError } from 'slices/error';
import { onCreateSectionSuccess } from 'slices/created-section';
import wrappedFetch from 'lib/fetch';
import { onUserProfileSuccess } from 'slices/user';
import StorageService from 'services/storage';
import { getInProgressSuccess, removeItemFromInProgress } from 'slices/in-progress-items';
import { createAction } from '@reduxjs/toolkit';
import { ApiClient } from 'lib/http';

export const redirectToLogin = createAction('loginRedirect');

export const onGetSections = (
    service: SectionsService = new SectionsApiService(new ApiClient())
) => async (dispatch: Dispatch) => {
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

export const onSubmitMergeSections = async (
    service: SectionsService,
    payload: MergeSectionsPayload,
    dispatch: Dispatch
) => {
    dispatch(requestStarted());

    try {
        const newSectionFromMerged = await service.mergeSections(payload);
        dispatch(onSetMergedSection(newSectionFromMerged));
    } catch (err) {
        dispatch(onThrowError(err));
    }
};

export const onSubmitCreateSection = (
    service: SectionsService,
    payload: CreateSectionPayload
) => async (dispatch: Dispatch) => {
    dispatch(requestStarted());
    let newSection;
    try {
        newSection = await service.createSection(payload);
    } catch (error) {
        return error;
    }
    dispatch(onCreateSectionSuccess(newSection));
};

export const onFetchMergeSummary = async (
    service: BackendService,
    payload: string,
    dispatch: Dispatch
) => {
    if (!isSectionsParamValid(payload)) {
        dispatch(onThrowError('Invalid sections provided for merge'));
        return;
    }

    dispatch(requestStarted());

    let summary: EntitiesAffected;

    try {
        summary = await service.getEntitiesForMerge(payload);
        dispatch(requestComplete());
        return summary;
    } catch (err) {
        dispatch(onThrowError(err));
    }
};

export const fetchUserProfile = async (dispatch: Dispatch) => {
    dispatch(requestStarted());
    try {
        const data = await wrappedFetch(process.env.REACT_APP_USER_PROFILE_ENDPOINT as string);
        dispatch(onUserProfileSuccess(data));
    } catch (err) {
        dispatch(redirectToLogin());
    }
};

export const getInProgressItems = (storageService: StorageService, payload: string) => (
    dispatch: Dispatch
) => {
    let actionKeys = storageService.getAllItems();
    let filteredKeys: string[] = [];
    const currentCountry = isCurrentCountry(payload);
    if (actionKeys) {
        const keysForCurrentCountry = actionKeys.filter(currentCountry);
        filteredKeys = filterDuplicateClose(keysForCurrentCountry);
    }

    dispatch(getInProgressSuccess(filteredKeys));
};

export const onRemoveItemInProgress = (dispatch: Dispatch, payload: string) => {
    dispatch(removeItemFromInProgress(payload));
};
