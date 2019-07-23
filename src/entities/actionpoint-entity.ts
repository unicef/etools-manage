import { EntityConfig } from 'entities';
import { ActionPointEntity, EntityDisplay } from './types';
import { ActionPointsBuilder } from './action-points-builder';


export default class ActionPointConfig implements EntityConfig<ActionPointEntity> {
    public get displayProperties(): EntityDisplay<ActionPointEntity>[] {
        return [
            { label: 'Reference Number', propName: 'reference_number' },
            { label: 'Description', propName: 'description' }
        ];
    }
    public get title() {
        return 'Action Points';
    }
    public get sectionsProp() {
        return 'section';
    }

    public get builder() {
        return new ActionPointsBuilder();
    }
}

