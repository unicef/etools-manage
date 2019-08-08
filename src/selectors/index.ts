import { createSelector } from 'redux-starter-kit';
import { Store } from 'slices/root-store';
import { ModuleEntities, SectionEntity } from 'entities/types';
import { propEq, reject, map, prop, includes, without } from 'ramda';
import { OptionType } from 'components/dropdown';


export const selectCloseSectionPayload = createSelector<Store, ModuleEntities>(
    ['closeSectionPayload'],
);

export const selectModuleEditingName = createSelector(
    ['moduleEditingName'],
);

export const selectSections = createSelector<Store, SectionEntity[]>(
    ['sections'],
);

export const selectCurrentActiveSection = createSelector(
    ['currentActiveSection']
);

export const selectCurrentActiveSectionName = createSelector(
    [selectCurrentActiveSection, selectSections],
    (id: number, sections: SectionEntity[]) => prop('name', sections.find(propEq('id', id)))
);

export const selectSectionsAsOptions = createSelector<Store, OptionType[]>(
    [selectSections, selectCurrentActiveSection],
    (sections, current) => {
        const sectionsWithoutCurrent = reject(propEq('id', current), sections);
        const asOptions = map(({ name, id }: {name: string; id: number}) => ({ label: name, value: id }), sectionsWithoutCurrent);
        return asOptions;
    }
);

// Note: higher order selectors will not memoize this way
export const selectExistingAsOptions = (existing: number[]) => createSelector(
    [selectSectionsAsOptions],
    (sectionsAsOptions: OptionType[]) => sectionsAsOptions.filter(({ value }) => includes(value, existing))
);

export const getSelectedOptions = (sections: number[]) => createSelector(
    [selectSectionsAsOptions],
    sectionsAsOptions => sectionsAsOptions.filter(
        (option: OptionType) => includes(option.value, sections)
    )
);


export const getOptionsWithoutExisting = (existing: number[]) => createSelector(
    [selectSectionsAsOptions, selectExistingAsOptions(existing)],
    (sectionsAsOptions, existingAsOptions) => without(existingAsOptions, sectionsAsOptions)
);

export const getExistingSectionsStr = (existing: number[]) => createSelector(
    [selectSections],
    (sections: SectionEntity[]) => sections
        .filter(section => existing.includes(section.id))
        .map(prop('name'))
        .join(',')
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
