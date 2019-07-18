import EntityConfig from 'entities';
import { PropertyNames } from 'helpers';
import { TPMActivityEntity } from './types';


export default class TPMActivityConfig extends EntityConfig<TPMActivityEntity> {

    public get displayProperties(): PropertyNames<TPMActivityEntity>[] {
        return ['reference_number'];
    }

    public get title() {
        return 'TPM Activities';
    }
    public get sectionsProp() {
        return 'sections';
    }

}
