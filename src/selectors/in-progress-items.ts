import { createSelector } from 'redux-starter-kit';
import { selectSections, selectCurrentActiveSection } from 'selectors';
import { parseKeyForId, parseKeyForAction } from 'lib/sections';
import { map, propEq } from 'ramda';
import { InProgressItem } from 'entities/types';


export const selectInProgress = createSelector(
    ['inProgressItems']
);

export const deriveRowsFromInProgress = createSelector(
    [selectInProgress, selectSections],
    (items, sections) => {
        if (!items.length || !sections.length) {
            return [];
        }

        const buildRowItem = (key: string) => {
            const id = parseKeyForId(key);
            const action = parseKeyForAction(key);
            const section = sections.find(propEq('id', Number(id)));
            return {
                name: section.name,
                action,
                storageKey: key,
                id
            };
        };

        const rows = map(buildRowItem, items);
        return rows;
    }
);


export const getStorageKeyFromCurrentActive = createSelector(
    [selectCurrentActiveSection, deriveRowsFromInProgress],
    (currentId: number, rows: InProgressItem[]) => {
        const row = rows.find(({ id }) => Number(id) === currentId);
        return row;
    }
);
