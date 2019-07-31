import { createSelector } from 'redux-starter-kit';
import { Store } from 'slices/root-store';
import { ModuleEntities } from 'entities/types';


export const selectCloseSectionPayload = createSelector<Store, ModuleEntities>(
    ['closeSectionPayload'],
);

export const selectModuleEditingName = createSelector(
    ['moduleEditingName'],
);

export const selectSections = createSelector(
    ['sections'],
);

export const selectCurrentActiveSection = createSelector(
    ['currentActiveSection']
);

