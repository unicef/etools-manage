
import { createSelector } from 'redux-starter-kit';
import { FullStoreShape } from 'contexts/app';
import { CloseSectionActionsMap, ActionBarKeys } from 'pages/close-section/types';

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


