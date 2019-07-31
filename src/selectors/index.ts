import { createSelector } from 'redux-starter-kit';
import { identity } from 'ramda';
import { firstValue } from 'utils';
import { Store } from 'slices/root-store';
import { CloseSectionPayload } from 'entities/types';


export const selectCloseSectionPayload = createSelector<Store, CloseSectionPayload>(
    ['closeSectionPayload'],
    firstValue
);

export const selectModuleEditingName = createSelector(
    ['moduleEditingName'],
    identity
);

export const selectSections = createSelector(
    ['sections'],
    identity
);

