import { FMActivity, EntityDisplay, EntityConfig } from './types';
import { prop } from 'ramda';

export default class FMActivityConfig implements EntityConfig<FMActivity> {
    public get displayProperties(): EntityDisplay<FMActivity>[] {
        return [{ label: 'Reference Number', display: prop('reference_number') }];
    }

    public get title() {
        return 'FM Activities';
    }
    public get sectionsProp() {
        return 'sections';
    }

    public get moduleName() {
        return 'Field Monitoring Activities';
    }
}
