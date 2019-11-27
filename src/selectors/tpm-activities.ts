import { createSelector } from '@reduxjs/toolkit';
import { selectCloseSectionPayload } from 'selectors';
import { TPMActivity, Normalized, ResolvedRatio, ModuleEntities } from 'entities/types';
import { prop, reduce, keys } from 'ramda';
import { FullStoreShape } from 'contexts/app';
import { clearCurrentSection } from 'lib/sections';

export const selectTPMFromPayload = createSelector<
    FullStoreShape,
    ModuleEntities,
    Normalized<TPMActivity>
>(
    [selectCloseSectionPayload],
    prop('tpmActivities')
);

export const selectTPMActivitiesIds = createSelector(
    [selectTPMFromPayload],
    keys
);

export const tpmActivitiesWithoutCurrentSection = createSelector(
    [selectTPMFromPayload],
    clearCurrentSection
);

export const getNumResolvedTPMActivities = createSelector(
    [selectTPMFromPayload],
    (tpmActivities: Normalized<TPMActivity> = {}): ResolvedRatio => {
        const resolved = reduce(
            (sum: number, key: string) => {
                const { section }: { section: string } = tpmActivities[key];
                if (section) {
                    sum++;
                }
                return sum;
            },
            0,
            keys(tpmActivities)
        );

        return { resolved, total: keys(tpmActivities).length };
    }
);
