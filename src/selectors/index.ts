import { createSelector } from 'redux-starter-kit';
import { Store } from 'slices/root-store';
import { ModuleEntities, SectionEntity } from 'entities/types';
import { propEq, reject, map, prop } from 'ramda';


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

export const selectCurrentActiveSectionName = createSelector(
    [selectCurrentActiveSection, selectSections],
    (id: number, sections: SectionEntity[]) => prop('name', sections.find(propEq('id', id)))
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
    ['mergedSection']
);

export const selectCreatedSection = createSelector(
    ['createdSection']
);
export const selectClosedSectionSuccess = createSelector(
    ['closedSectionSuccess']
);
