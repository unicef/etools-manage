import { ActionPointEntity } from './types';
import { Builder } from 'entities';
import ActionPointsEdit from 'components/entity-edit/action-points';

export class ActionPointsBuilder implements Builder<ActionPointEntity> {


    public get Component() {
        return ActionPointsEdit;
    }

    public numItemsResolved(actionPoints: ActionPointEntity[]): string {
        return '11/14'; // TODO: implement
    }

}
