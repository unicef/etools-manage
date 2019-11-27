import { EntityConfig } from 'entities';
import { ActionPoint, EntityDisplay } from './types';

export default class ActionPointConfig implements EntityConfig<ActionPoint> {
    public get displayProperties(): EntityDisplay<ActionPoint>[] {
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

    public get moduleName() {
        return 'Action Points';
    }
}
