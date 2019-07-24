import { TravelEntity } from './types';
import { Builder } from 'entities';
import TravelsEdit from 'components/entity-edit/travels';

export class TravelsBuilder implements Builder<TravelEntity> {


    public get Component() {
        return TravelsEdit;
    }

    public numItemsResolved(travels: TravelEntity[]): string {
        return '11/14'; // TODO: implement
    }

}
