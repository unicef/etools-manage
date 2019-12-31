import { ActionPoint, EntityDisplay, EntityConfig } from './types';
import { prop } from 'ramda';

export default class ActionPointConfig implements EntityConfig<ActionPoint> {
    public get displayProperties(): EntityDisplay<ActionPoint>[] {
        return [
            { label: 'Reference Number', display: prop('reference_number') },
            { label: 'Description', display: prop('description') }
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
