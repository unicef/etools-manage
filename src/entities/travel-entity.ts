import { EntityConfig } from 'entities';
import { Travel, EntityDisplay } from './types';

export default class TravelsConfig implements EntityConfig<Travel> {
    public get displayProperties(): EntityDisplay<Travel>[] {
        return [
            {
                label: 'Reference number',
                propName: 'reference_number'
            },
            {
                label: 'Purpose',
                propName: 'purpose'
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
