import Entity from 'entities';
import { PropertyNames } from 'helpers';

export interface TPMActivityEntity {
    id: number;
    reference_number: string;
    status: string;
}


export default class TPMActivity extends Entity<TPMActivityEntity> {

    public get displayProperties(): PropertyNames<TPMActivityEntity>[] {
        return ['reference_number', 'id'];
    }

}
