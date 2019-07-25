import { TravelEntity } from './types';
import { Builder } from 'entities';
import TravelsEdit from 'components/entity-edit/travels';
import { length, filter, prop } from 'ramda';

export class TravelsBuilder implements Builder<TravelEntity> {


    public get Component() {
        return TravelsEdit;
    }

    public numItemsResolved(travels: TravelEntity[]): string {
        const numResolved = length(filter(prop('id'), travels));
        return `${numResolved} / ${travels.length}`;
    }

}
