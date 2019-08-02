import { createSelector } from 'redux-starter-kit';
import { selectCloseSectionPayload, selectCurrentActiveSection } from 'selectors';
import { InterventionEntity, Normalized } from 'entities/types';
import { Store } from 'slices/root-store';
import { prop, map, without, keys } from 'ramda';
import { normalize } from 'normalizr';
import { interventionSchema } from 'entities/schemas';
import { normDefault } from 'lib/sections';


export const selectInterventionsFromPayload = createSelector<Store, Normalized<InterventionEntity>>(
    [selectCloseSectionPayload],
    prop('interventions'),
);

export const selectInterventionIds = createSelector<Store, number[]>(
    [selectInterventionsFromPayload],
    interventions => interventions.result.slice(0, 20)
);

export const getNumResolvedInterventions = createSelector<Normalized<InterventionEntity>, number[]>(
    [selectInterventionsFromPayload],
    (root: Normalized<InterventionEntity> = normDefault): number[] => {
        const { data: interventions } = root;
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
        console.log('TCL: numResolved', numResolved);
        return [numResolved, total];
    }
);

export const interventionsWithoutCurrentSection = createSelector(
    [selectCurrentActiveSection, selectInterventionsFromPayload],
    (id: number, root: Normalized<InterventionEntity> = normDefault) => {
        const { data: interventions } = root;
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

        const { entities, result } = normalize(newList, [interventionSchema]);
        return { result, data: entities.interventions };
    }
);


