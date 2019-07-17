import EntityConfig from 'entities';
import { PropertyNames } from 'helpers';
import { TPMActivityEntity } from './types';


export default class TPMActivityConfig extends EntityConfig<TPMActivityEntity> {

    public get displayProperties(): PropertyNames<TPMActivityEntity>[] {
        return ['reference_number', 'status'];
    }

    public get title() {
        return 'TPM Activities';
    }

}
