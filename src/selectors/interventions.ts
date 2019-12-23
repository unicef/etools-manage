import { createSelector } from '@reduxjs/toolkit';
import { selectCloseSectionPayload, selectCurrentActiveSection, selectSections } from 'selectors';
import { Intervention, Normalized, ResolvedRatio, Section, ModuleEntities } from 'entities/types';
import { prop, map, without, keys, includes, reject, compose, lensProp, over, always } from 'ramda';

import { normalize } from 'normalizr';
import { interventionSchema } from 'entities/schemas';
import { FullStoreShape } from 'contexts/app';

export const selectInterventionsFromPayload = createSelector<
    FullStoreShape,
    ModuleEntities,
    Normalized<Intervention>
>(
    [selectCloseSectionPayload],
    payload => {
        return payload.interventions;
    }
);

export const selectInterventionIds = createSelector(
    [selectInterventionsFromPayload],
    keys
);

export const selectIndicators = (intervId: string) =>
    createSelector(
        [selectInterventionsFromPayload],
        (interventions: Normalized<Intervention>) => interventions[intervId].indicators
    );

export const getNumResolvedInterventions = createSelector<
    FullStoreShape,
    Normalized<Intervention>,
    ResolvedRatio
>(
    [selectInterventionsFromPayload],
    (interventions = {}) => {
        let total = 0;
        const resolved = keys(interventions).reduce((resolved: number, key: number) => {
            const intervention = interventions[key];
            total++;
            if (intervention.sections.length > 0) {
                resolved++;
            }
            intervention.indicators.forEach(indicator => {
                total++;
                if (indicator.section) {
                    resolved++;
                }
            });

            return resolved;
        }, 0);
        return { resolved, total };
    }
);

export const interventionsWithoutCurrentSection = createSelector(
    [selectCurrentActiveSection, selectInterventionsFromPayload, selectSections],
    (id: number, interventions: Normalized<Intervention>, sectionsList: Section[]) => {
        const newList = map((key: number) => {
            const item: Intervention = interventions[key];

            const existingSectionsIds = without([id], item.sections);

            const existingSectionsNames: string[] = sectionsList
                .filter(({ id }) => includes(id, existingSectionsIds))
                .map(prop('name'));

            // we dont want indicators from an existing section to be included
            const fromExisting = ({ section }: { section: number }) =>
                existingSectionsIds.includes(section);

            // filters indicators to remove unaffected items, then clears section prop on remaining
            const removedSectionIndicators = compose(
                map(over(lensProp('section'), always(''))),
                reject(fromExisting)
            )(item.indicators);

            const res: Intervention = {
                ...item,
                indicators: removedSectionIndicators,
                sections: [],
                existingSections: existingSectionsNames
            };

            return res;
        }, keys(interventions));

        const { entities } = normalize(newList, [interventionSchema]);
        return entities.interventions;
    }
);
