import { createSelector } from '@reduxjs/toolkit';
import { selectSections, selectCurrentActiveSection } from 'selectors';
import { parseKeyForId, parseKeyForAction } from 'lib/sections';
import { map, propEq, filter, compose } from 'ramda';
import { InProgressItem, Section } from 'entities/types';
import { FullStoreShape } from 'contexts/app';

export const selectInProgress = (state: FullStoreShape) => state.inProgressItems;

export const deriveRowsFromInProgress = createSelector<
    FullStoreShape,
    string[],
    Section[],
    InProgressItem[]
>(
    [selectInProgress, selectSections],
    (items, sections) => {
        if (!items.length || !sections.length) {
            return [];
        }

        const buildRowItem = (key: string) => {
            const id = parseKeyForId(key);
            const action = parseKeyForAction(key);
            const section = sections.find(propEq('id', Number(id)));

            if (!section) {
                return null;
            }
            return {
                name: section.name,
                action,
                storageKey: key,
                id
            };
        };

        const buildRowsFrom = compose(
            filter(Boolean),
            map(buildRowItem)
        );

        return buildRowsFrom(items);
    }
);

export const getStorageKeyFromCurrentActive = createSelector(
    [selectCurrentActiveSection, deriveRowsFromInProgress],
    (currentId: number, rows: InProgressItem[]) => {
        const row = rows.find(({ id }) => Number(id) === currentId);
        return row;
    }
);
