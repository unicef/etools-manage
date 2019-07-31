import { createSelector } from 'redux-starter-kit';
import { selectCloseSectionPayload } from 'selectors';
import { InterventionEntity, ModuleEntities } from 'entities/types';
import { Store } from 'slices/root-store';
import { prop } from 'ramda';


export const selectInterventionsFromPayload = createSelector<Store, ModuleEntities>(
    [selectCloseSectionPayload],
    prop('interventions')
);

export const getNumResolvedInterventions = createSelector(
    [selectInterventionsFromPayload],
    (interventions: InterventionEntity[] = []): string => {
        console.log('TCL: interventions', interventions);
        let total = 0;
        const numResolved = interventions.reduce((resolved, intervention) => {
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
        return `${numResolved} / ${total}`;
    }
);

// export const interventionRemoveSection

export const interventionRemoveSection = createSelector(
    []
)


(list: InterventionEntity[], id: number) => map(
    (item: InterventionEntity) => {
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
    list
);

