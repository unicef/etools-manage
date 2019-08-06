import { createSelector } from 'redux-starter-kit';
import { Store } from 'slices/root-store';
import { ModuleEntities } from 'entities/types';
import { propEq, reject, map } from 'ramda';


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

export const selectSectionsAsOptions = createSelector(
    [selectSections, selectCurrentActiveSection],
    (sections, current) => {
        const sectionsWithoutCurrent = reject(propEq('id', current), sections);
        const asOptions = map(({ name, id }: {name: string; id: number}) => ({ label: name, value: id }), sectionsWithoutCurrent);
        return asOptions;
    }
);

export const selectLoading = createSelector(
    ['loading']
);

export const selectError = createSelector(
    ['error']
);

export const selectMergeSection = createSelector(
    ['mergeSection']
);

export const selectCreatedSection = createSelector(
    ['createdSection']
);
export const selectClosedSectionSuccess = createSelector(
    ['closedSectionSuccess']
);
