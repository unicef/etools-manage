import { PropertyNames } from 'helpers';
import EntityConfig from 'entities';

export interface ActionPointEntity {
    id: number;
    reference_number: string;
    description: string;
    status: string;
}


export default class ActionPointConfig extends EntityConfig<ActionPointEntity> {
    public get displayProperties(): PropertyNames<ActionPointEntity>[] {
        return ['reference_number', 'description'];
    }
}

