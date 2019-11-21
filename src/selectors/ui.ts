import { createSelector } from '@reduxjs/toolkit';
import { FullStoreShape } from 'contexts/app';
import { ActionBarKeys } from 'pages/close-section/types';
import { selectCloseSectionPayload } from 'selectors';
import { selectTotalProgress } from './num-items-resolved';
import { isEmpty, keys } from 'ramda';
import {
    ACTION_BAR_DISABLED_ACTIONS,
    ACTION_BAR_CONNECTED,
    ACTION_BAR_REVIEW
} from 'pages/close-section/constants';

export const selectUi = (state: FullStoreShape) => state.ui;

export const selectMenuItemIdx = createSelector(
    [selectUi],
    ui => ui.selectedMenuIdx
);

export const selectCloseSectionActionBar = createSelector<
    FullStoreShape,
    FullStoreShape['ui'],
    ActionBarKeys
>(
    [selectUi],
    ui => ui.closeSectionActionBar
);

export const selectViewCloseSummary = createSelector(
    [selectUi],
    ui => ui.viewCloseSummary
);

export const deriveCloseSectionActionBar = createSelector(
    [selectTotalProgress, selectCloseSectionPayload, selectViewCloseSummary],
    (progress, closedSectionPayload, viewSummary) => {
        const hasData = !isEmpty(keys(closedSectionPayload));

        if (progress < 100 && hasData) {
            return ACTION_BAR_DISABLED_ACTIONS;
        }
        if (!hasData) {
            return ACTION_BAR_CONNECTED;
        }

        if (!viewSummary && progress === 100) {
            return ACTION_BAR_REVIEW;
        }
        return '';
    }
);
