import { TPMActivity, EntityDisplay, EntityConfig } from './types';
import { prop } from 'ramda';

export default class TPMActivityConfig implements EntityConfig<TPMActivity> {
    public get displayProperties(): EntityDisplay<TPMActivity>[] {
        return [{ label: 'Reference Number', display: prop('visit_reference') }];
    }

    public get title() {
        return 'TPM Activities';
    }
    public get sectionsProp() {
        return 'section';
    }

    public get moduleName() {
        return 'Third Party Monitoring';
    }
}
