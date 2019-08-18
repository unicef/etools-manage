import { createSelector } from 'redux-starter-kit';
import { selectSections } from 'selectors';
import { parseKeyForId, parseKeyForAction } from 'lib/sections';
import { includes, allPass, reject, map, propEq } from 'ramda';


export const selectInProgress = createSelector(
    ['inProgressItems']
);

export const deriveRowsFromInProgress = createSelector(
    [selectInProgress, selectSections],
    (items, sections) => {
        if (!items.length || !sections.length) {
            return [];
        }
        const splitIds = items
            .filter(
                (key: string) => key.includes('split')
            ).map(
                parseKeyForId
            );

        const isCloseAction = includes('close');
        const isCloseFromSplit = (key: string) => includes(parseKeyForId(key), splitIds);

        // We don't want to list split sections as both and split in progress items
        const removeDuplicateClose = reject(
            allPass([isCloseAction, isCloseFromSplit])
        );

        const buildRowItem = (key: string) => {
            const id = parseKeyForId(key);
            const action = parseKeyForAction(key);
            const section = sections.find(propEq('id', Number(id)));
            return {
                name: section.name,
                action,
                id
            };
        };

        const filtered = removeDuplicateClose(items);

        const rows = map(buildRowItem, filtered);
        return rows;
    }
);

