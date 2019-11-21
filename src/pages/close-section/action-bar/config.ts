import { ACTION_BAR_DISABLED_ACTIONS, ACTION_BAR_CONNECTED, ACTION_BAR_REVIEW } from '../constants';
import { CloseSectionActionsMap } from '../types';

import ActionBarDisabled from '../action-bar/disabled-actions';
import ActionBarConnectedConfirm from '../action-bar/connected-confirm';
import ActionBarReviewReady from '../action-bar/review-ready';

export const ActionBarMapping: CloseSectionActionsMap = {
    [ACTION_BAR_DISABLED_ACTIONS]: ActionBarDisabled,
    [ACTION_BAR_CONNECTED]: ActionBarConnectedConfirm,
    [ACTION_BAR_REVIEW]: ActionBarReviewReady
};
