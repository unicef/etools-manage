import { EntityConfig } from 'entities';
import { TPMActivity, EntityDisplay } from './types';

export default class TPMActivityConfig implements EntityConfig<TPMActivity> {
    public get displayProperties(): EntityDisplay<TPMActivity>[] {
        return [{ label: 'Reference Number', propName: 'reference_number' }];
    }

    public get title() {
        return 'TPM Activities';
    }
    public get sectionsProp() {
        return 'sections';
    }

    public get moduleName() {
        return 'Third Party Monitoring';
    }
}
