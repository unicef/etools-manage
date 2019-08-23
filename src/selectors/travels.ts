import { createSelector } from 'redux-starter-kit';
import { selectCloseSectionPayload } from 'selectors';
import { TravelEntity, Normalized, ResolvedRatio } from 'entities/types';
import { prop, keys } from 'ramda';
import { clearCurrentSection, getNumResolved } from 'lib/sections';
import { FullStoreShape } from 'contexts/app';

export const selectTravelsFromPayload = createSelector<FullStoreShape, Normalized<TravelEntity>>(
    [selectCloseSectionPayload],
    prop('travels')
);

export const selectTravelsIds = createSelector(
    [selectTravelsFromPayload],
    keys
);
export const getNumResolvedTravels = createSelector<Normalized<TravelEntity>, ResolvedRatio>(
    [selectTravelsFromPayload],
    getNumResolved
);

export const travelsWithoutCurrentSection = createSelector(
    [selectTravelsFromPayload],
    clearCurrentSection
);
