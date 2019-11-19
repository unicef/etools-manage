import { createSelector } from '@reduxjs/toolkit';
import { selectCloseSectionPayload } from 'selectors';
import { ActionPoint, ModuleEntities, Normalized } from 'entities/types';
import { prop, keys } from 'ramda';
import { clearCurrentSection, getNumResolved } from 'lib/sections';
import { FullStoreShape } from 'contexts/app';

export const selectActionPointsFromPayload = createSelector<
    FullStoreShape,
    ModuleEntities,
    Normalized<ActionPoint>
>(
    [selectCloseSectionPayload],
    prop('actionPoints')
);
export const selectActionPointsIds = createSelector(
    [selectActionPointsFromPayload],
    keys
);

export const actionPointsWithoutCurrentSection = createSelector(
    [selectActionPointsFromPayload],
    clearCurrentSection
);

export const getNumResolvedActionPoints = createSelector(
    [selectActionPointsFromPayload],
    getNumResolved
);
