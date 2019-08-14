
import { createSelector } from 'redux-starter-kit';
import { FullStoreShape } from 'contexts/app';
import { ActionBarKeys } from 'pages/close-section/types';
import { selectCloseSectionPayload } from 'selectors';
import { selectTotalProgress } from './num-items-resolved';
import { isEmpty, keys } from 'ramda';
import { ACTION_BAR_DISABLED_ACTIONS, ACTION_BAR_CONNECTED, ACTION_BAR_REVIEW } from 'pages/close-section/constants';

export const selectMenuItem = createSelector(
    ['ui.selectedMenuIdx']
);

export const selectCloseSectionActionBar = createSelector<FullStoreShape, ActionBarKeys>(
    ['ui'],
    ui => ui.closeSectionActionBar
);

export const selectViewCloseSummary = createSelector(
    ['ui.viewCloseSummary']
);

export const deriveCloseSectionActionBar = createSelector(
    [selectTotalProgress, selectCloseSectionPayload, selectViewCloseSummary],
    (progress, closedSectionPayload, viewSummary) => {
        const hasData = !isEmpty(keys(closedSectionPayload));

        if (!hasData) {
            return ACTION_BAR_CONNECTED;
        }
        if (!viewSummary && progress === 100) {
            return ACTION_BAR_REVIEW;
        }

        return ACTION_BAR_DISABLED_ACTIONS;


    }
);
