import { EntityDisplay, EntityConfig, Partner } from './types';
import { prop } from 'ramda';

export default class PartnersConfig implements EntityConfig<Partner> {
    public get displayProperties(): EntityDisplay<Partner>[] {
        return [
            {
                label: 'Vendor Number',
                display: prop('vendor_number')
            },
            {
                label: 'Partner',
                display: prop('name')
            }
        ];
    }
    public get title() {
        return 'Partners';
    }
    public get sectionsProp() {
        return 'lead_section';
    }

    public get moduleName() {
        return 'PMP Partners';
    }
}
