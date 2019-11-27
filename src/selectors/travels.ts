import { createSelector } from '@reduxjs/toolkit';
import { selectCloseSectionPayload } from 'selectors';
import { Travel, Normalized, ResolvedRatio, ModuleEntities } from 'entities/types';
import { prop, keys } from 'ramda';
import { clearCurrentSection, getNumResolved } from 'lib/sections';
import { FullStoreShape } from 'contexts/app';

export const selectTravelsFromPayload = createSelector<
    FullStoreShape,
    ModuleEntities,
    Normalized<Travel>
>(
    [selectCloseSectionPayload],
    prop('travels')
);

export const selectTravelsIds = createSelector(
    [selectTravelsFromPayload],
    keys
);
export const getNumResolvedTravels = createSelector<
    FullStoreShape,
    Normalized<Travel>,
    ResolvedRatio
>(
    [selectTravelsFromPayload],
    getNumResolved
);

export const travelsWithoutCurrentSection = createSelector(
    [selectTravelsFromPayload],
    clearCurrentSection
);
