
import { createSelector } from 'redux-starter-kit';

export const selectMenuItem = createSelector(
    ['ui.selectedMenuIdx']
);
