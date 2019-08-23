import { createSelector } from 'redux-starter-kit';
import { map, prop } from 'ramda';
import { FullStoreShape } from 'contexts/app';

export const selectSectionsFromSplit = createSelector(['sectionsFromSplit']);

export const selectNamesFromsplit = createSelector<FullStoreShape, string[]>(
    [selectSectionsFromSplit],
    map(prop('name'))
);
