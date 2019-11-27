import { createSelector } from '@reduxjs/toolkit';
import { map, prop } from 'ramda';
import { FullStoreShape } from 'contexts/app';
import { Section } from 'entities/types';

export const selectSectionsFromSplit: (state: FullStoreShape) => Section[] = state =>
    state.sectionsFromSplit;

export const selectNamesFromsplit = createSelector<FullStoreShape, Section[], string[]>(
    [selectSectionsFromSplit],
    map(prop('name'))
);
