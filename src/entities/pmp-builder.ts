import { InterventionEntity } from './types';
import { Builder } from 'entities';
import InterventionsEdit from 'components/entity-edit/interventions';

export class PmpBuilder implements Builder<InterventionEntity> {

    public name = 'interventions'

    public get Component() {
        return InterventionsEdit;
    }

    public numItemsResolved(interventions: InterventionEntity[]): string {
        return '11/14'; // TODO: implement
    }

}
