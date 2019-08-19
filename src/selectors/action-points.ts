import { createSelector } from 'redux-starter-kit';
import { selectCloseSectionPayload } from 'selectors';
import { ActionPointEntity } from 'entities/types';
import { prop, keys } from 'ramda';
import { clearCurrentSection, getNumResolved } from 'lib/sections';
import { FullStoreShape } from 'contexts/app';


export const selectActionPointsFromPayload = createSelector<FullStoreShape, ActionPointEntity[]>(
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
