import { createSelector } from 'redux-starter-kit';
import { FullStoreShape } from 'contexts/app';
import { selectSections } from 'selectors';


export const selectInProgress = createSelector(
    ['inProgressItems']
);

export const deriveRowsFromInProgress = createSelector(
    [selectInProgress, selectSections],
    items => {

    }
);

