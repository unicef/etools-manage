import { createSelector } from 'redux-starter-kit';
import { selectCloseSectionPayload } from 'selectors';
import { ModuleEntities } from 'entities/types';
import { Store } from 'slices/root-store';
import { prop } from 'ramda';
import { clearCurrentSection, getNumResolved } from 'lib/sections';


export const selectActionPointsFromPayload = createSelector<Store, ModuleEntities>(
    [selectCloseSectionPayload],
    prop('actionPoints')
);

export const actionPointsWithoutCurrentSection = createSelector(
    [selectActionPointsFromPayload],
    clearCurrentSection
);

export const getNumResolvedActionPoints = createSelector(
    [selectActionPointsFromPayload],
    getNumResolved
);
