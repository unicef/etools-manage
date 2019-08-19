import { EntityConfig } from 'entities';
import { TPMActivityEntity, EntityDisplay } from './types';
import { map, propEq, reject } from 'ramda';


export default class TPMActivityConfig implements EntityConfig<TPMActivityEntity> {

    public get displayProperties(): EntityDisplay<TPMActivityEntity>[] {
        return [
            { label: 'Reference Number', propName: 'reference_number' }
        ];
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
