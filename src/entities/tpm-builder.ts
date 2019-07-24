import { TPMActivityEntity } from './types';
import { Builder } from 'entities';
import TPMActivitiesEdit from 'components/entity-edit/tpmActivities';

export class TPMBuilder implements Builder<TPMActivityEntity> {


    public get Component() {
        return TPMActivitiesEdit;
    }

    public numItemsResolved(tpmActivities: TPMActivityEntity[]): string {
        return '11/14'; // TODO: implement
    }

}
