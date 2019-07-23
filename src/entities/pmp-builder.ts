import { InterventionEntity } from './types';

export class PmpBuilder {

    private interventions: InterventionEntity[]
    public constructor(list: InterventionEntity[]) {
        this.interventions = list;
    }

}
