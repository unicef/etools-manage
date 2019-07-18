import { PropertyNames } from 'helpers';
import EntityConfig from 'entities';
import { ActionPointEntity } from './types';


export default class ActionPointConfig extends EntityConfig<ActionPointEntity> {
    public get displayProperties(): PropertyNames<ActionPointEntity>[] {
        return ['reference_number', 'description'];
    }
    public get title() {
        return 'Action Points';
    }
    public get sectionsProp() {
        return 'section';
    }
}

