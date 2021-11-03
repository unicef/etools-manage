import { createSelector } from '@reduxjs/toolkit';
import { selectCloseSectionPayload } from 'selectors';
import { Partner, EntitiesAffected, Normalized } from 'entities/types';
import { prop, keys } from 'ramda';
import { clearCurrentSection, getNumResolved } from 'lib/sections';
import { FullStoreShape } from 'contexts/app';

export const selectPartnersFromPayload = createSelector<
    FullStoreShape,
    EntitiesAffected,
    Normalized<Partner>
>(
    [selectCloseSectionPayload],
    prop('partners')
);
export const selectPartnerIds = createSelector(
    [selectPartnersFromPayload],
    keys
);

export const partnersWithoutCurrentSection = createSelector(
    [selectPartnersFromPayload],
    clearCurrentSection
);

export const getNumResolvedPartners = createSelector(
    [selectPartnersFromPayload],
    getNumResolved
);
