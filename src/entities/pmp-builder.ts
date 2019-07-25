import { InterventionEntity } from './types';
import { Builder } from 'entities';
import InterventionsEdit from 'components/entity-edit/interventions';

export class PmpBuilder implements Builder<InterventionEntity> {

    public name = 'interventions'

    public get Component() {
        return InterventionsEdit;
    }

    public numItemsResolved(interventions: InterventionEntity[]): string {
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

}
