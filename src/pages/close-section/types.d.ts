
import { ACTION_BAR_DISABLED_ACTIONS, ACTION_BAR_CONNECTED, ACTION_BAR_REVIEW } from './constants';


export type ActionBarKeys = typeof ACTION_BAR_DISABLED_ACTIONS | typeof ACTION_BAR_CONNECTED |
    typeof ACTION_BAR_REVIEW;

    type KEYS = 'action-bar-disabled' | 'action-bar-connected' | 'action-bar-review'

export type CloseSectionActionsMap ={
    [key in ActionBarKeys]: () => JSX.Element;
}
