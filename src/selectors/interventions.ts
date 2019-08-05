import { createSelector } from 'redux-starter-kit';
import { selectCloseSectionPayload, selectCurrentActiveSection } from 'selectors';
import { InterventionEntity, Normalized } from 'entities/types';
import { prop, map, without, keys } from 'ramda';
import { Store } from 'redux';

import { normalize } from 'normalizr';
import { interventionSchema } from 'entities/schemas';


export const selectInterventionsFromPayload = createSelector<Store, Normalized<InterventionEntity>>(
    [selectCloseSectionPayload],
    prop('interventions'),
);


export const selectInterventionIds = createSelector(
    [selectInterventionsFromPayload],
    keys
);

export const getNumResolvedInterventions = createSelector<Store, number[]>(
    [selectInterventionsFromPayload],
    (interventions: Normalized<InterventionEntity> = {}): number[] => {
        let total = 0;
        const numResolved = keys(interventions).reduce((resolved: number, key: number) => {
            const intervention = interventions[key];
            total++;
            if (intervention.sections.length > 0) {
                resolved++;
            }
            intervention.indicators.forEach(
                indicator => {
                    total++;
                    if (indicator.section) {
                        resolved++;
                    }
                }
            );

            return resolved;
        }, 0);
        return [numResolved, total];
    }
);

export const interventionsWithoutCurrentSection = createSelector(
    [selectCurrentActiveSection, selectInterventionsFromPayload],
    (id: number, interventions: Normalized<InterventionEntity> = {}) => {

        const newList = map(
            (key: number) => {
                const item: InterventionEntity = interventions[key];
                const removedSectionIndicators = item.indicators.map(
                    indicator => ({
                        ...indicator,
                        section: undefined
                    })
                );
                const res: InterventionEntity = ({
                    ...item,
                    indicators: removedSectionIndicators,
                    sections: without([id], item.sections) as number[]
                });

                return res;
            },
            keys(interventions)
        );

        const { entities } = normalize(newList, [interventionSchema]);
        return entities.interventions;
    }
);


