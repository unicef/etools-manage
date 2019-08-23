import { createSelector } from 'redux-starter-kit';
import { selectCloseSectionPayload, selectCurrentActiveSection, selectSections } from 'selectors';
import { InterventionEntity, Normalized, ResolvedRatio, SectionEntity } from 'entities/types';
import { prop, map, without, keys, includes } from 'ramda';
import { Store } from 'redux';

import { normalize } from 'normalizr';
import { interventionSchema } from 'entities/schemas';

export const selectInterventionsFromPayload = createSelector<Store, Normalized<InterventionEntity>>(
    [selectCloseSectionPayload],
    prop('interventions')
);

export const selectInterventionIds = createSelector(
    [selectInterventionsFromPayload],
    keys
);

export const getNumResolvedInterventions = createSelector<Store, ResolvedRatio>(
    [selectInterventionsFromPayload],
    (interventions: Normalized<InterventionEntity> = {}): ResolvedRatio => {
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
    (id: number, interventions: Normalized<InterventionEntity>, sectionsList: SectionEntity[]) => {
        const newList = map((key: number) => {
            const item: InterventionEntity = interventions[key];
            const removedSectionIndicators = item.indicators.map(indicator => ({
                ...indicator,
                section: ''
            }));

            const existingSectionsIds = without([id], item.sections);

            const existingSectionsNames: string[] = sectionsList
                .filter(({ id }) => includes(id, existingSectionsIds))
                .map(prop('name'));

            const res: InterventionEntity = {
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
