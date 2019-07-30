import { createSelector } from 'redux-starter-kit';
import { identity } from 'ramda';


export const selectCloseSectionPayload = createSelector(
    ['closeSectionPayload'],
    identity
);

export const selectModuleEditingName = createSelector(
    ['moduleEditingName'],
    identity
);

export const selectSections = createSelector(
    ['sections'],
    identity
);
