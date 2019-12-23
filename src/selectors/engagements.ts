import { createSelector } from '@reduxjs/toolkit';
import { selectCurrentActiveSection, selectCloseSectionPayload, selectSections } from 'selectors';
import { FullStoreShape } from 'contexts/app';
import { ModuleEntities, Normalized, Engagement, Section, ResolvedRatio } from 'entities/types';
import { map, keys, prop, without, includes } from 'ramda';
import { engagementsSchema } from 'entities/schemas';
import { normalize } from 'normalizr';

export const selectEngagementsFromPayload = createSelector<
    FullStoreShape,
    ModuleEntities,
    Normalized<Engagement>
>(
    [selectCloseSectionPayload],
    payload => {
        return payload.engagements;
    }
);

export const getNumResolvedEngagements = createSelector(
    [selectEngagementsFromPayload],
    (engagements: Normalized<Engagement> = {}): ResolvedRatio => {
        let total = 0;
        const resolved = keys(engagements).reduce(
            (resolved: number, key: number) => {
                total++;
                if (engagements[key].sections.length) {
                    return ++resolved;
                }
                return resolved;
            },
            0,
            keys(engagements)
        );
        return { resolved, total };
    }
);

export const selectEngagementIds = createSelector(
    [selectEngagementsFromPayload],
    keys
);

export const engagementsWithoutCurrentSection = createSelector(
    [selectCurrentActiveSection, selectEngagementsFromPayload, selectSections],
    (id: number, engagements: Normalized<Engagement>, sectionsList: Section[]) => {
        const newEngagements = map((key: number) => {
            const engagement: Engagement = engagements[key];
            const existingSectionsIds = without([id], engagement.sections.map(prop('id')));

            const existingSectionsNames: string[] = sectionsList
                .filter(({ id }) => includes(id, existingSectionsIds))
                .map(prop('name'));

            const result: Engagement = {
                ...engagement,
                sections: [],
                existingSections: existingSectionsNames
            };
            return result;
        }, keys(engagements));

        const { entities } = normalize(newEngagements, [engagementsSchema]);
        return entities.engagements;
    }
);
