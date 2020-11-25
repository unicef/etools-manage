import { createSelector } from '@reduxjs/toolkit';
import { selectCloseSectionPayload, selectCurrentActiveSection, selectSections } from 'selectors';
import { FMActivity, Normalized, ResolvedRatio, EntitiesAffected, Section } from 'entities/types';
import { map, keys, prop, without, includes, reduce } from 'ramda';
import { FullStoreShape } from 'contexts/app';
import { clearCurrentSection } from 'lib/sections';
import { fmActivitiesSchema } from 'entities/schemas';
import { normalize } from 'normalizr';

export const selectFMActivitiesFromPayload = createSelector<
    FullStoreShape,
    EntitiesAffected,
    Normalized<FMActivity>
>(
    [selectCloseSectionPayload],
    prop('fmActivities')
);

export const selectFMActivitiesIds = createSelector(
    [selectFMActivitiesFromPayload],
    keys
);

export const fmActivitiesWithoutCurrentSection = createSelector(
    [selectCurrentActiveSection, selectFMActivitiesFromPayload, selectSections],
    (id: number, fmActivities: Normalized<FMActivity>, sectionsList: Section[]) => {
        const newFmActivities = map((key: number) => {
             const fmActivity: FMActivity = fmActivities[key];
             const existingSectionsIds = without([id], fmActivity.sections.map(prop('id')));

             const existingSectionsNames: string[] = sectionsList
                 .filter(({ id }) => includes(id, existingSectionsIds))
                 .map(prop('name'));

             const result: FMActivity = {
                 ...fmActivity,
                 sections: [],
                 existingSections: existingSectionsNames
             };
             return result;
         }, keys(fmActivities));

        const { entities } = normalize(newFmActivities, [fmActivitiesSchema]);
        return entities.fmActivities;
    }
);

export const getNumResolvedFMActivities = createSelector(
    [selectFMActivitiesFromPayload],
    (fmActivities: Normalized<FMActivity> = {}): ResolvedRatio => {
        const resolved = reduce(
            (sum: number, key: string) => {
                const { sections }: { sections: string[] } = fmActivities[key];
                if (sections && sections.length) {
                    sum++;
                }
                return sum;
            },
            0,
            keys(fmActivities)
        );
        return { resolved, total: keys(fmActivities).length };
    }
);
