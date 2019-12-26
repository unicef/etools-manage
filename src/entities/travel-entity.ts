import { Travel, EntityDisplay, EntityConfig } from './types';
import { prop } from 'ramda';

export default class TravelsConfig implements EntityConfig<Travel> {
    public get displayProperties(): EntityDisplay<Travel>[] {
        return [
            {
                label: 'Reference number',
                display: prop('reference_number')
            },
            {
                label: 'Purpose',
                display: prop('purpose')
            }
        ];
    }
    public get title() {
        return 'Travels';
    }
    public get sectionsProp() {
        return 'section';
    }

    public get moduleName() {
        return 'Trip Management';
    }
}
