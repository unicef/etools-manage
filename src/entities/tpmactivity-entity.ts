import EntityConfig from 'entities';
import { TPMActivityEntity, EntityDisplay } from './types';


export default class TPMActivityConfig extends EntityConfig<TPMActivityEntity> {

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

}
