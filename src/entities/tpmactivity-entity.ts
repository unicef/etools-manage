import EntityConfig from 'entities';
import { PropertyNames } from 'helpers';

export interface TPMActivityEntity {
    id: number;
    reference_number: string;
    status: string;
}


export default class TPMActivityConfig extends EntityConfig<TPMActivityEntity> {

    public get displayProperties(): PropertyNames<TPMActivityEntity>[] {
        return ['reference_number', 'id'];
    }

}
