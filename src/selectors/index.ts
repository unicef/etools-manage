import { createSelector } from 'redux-starter-kit';
import { ModuleEntities, SectionEntity } from 'entities/types';
import { propEq, reject, map, prop, includes, without, filter, keys, concat, compose, sortBy } from 'ramda';
import { OptionType } from 'components/dropdown';
import { FullStoreShape } from 'contexts/app';
import { selectNamesFromSplit } from './split-section';


export const selectCloseSectionPayload = createSelector<FullStoreShape, ModuleEntities>(
    ['closeSectionPayload'],
);

export const selectCloseSectionPayloadKeys = createSelector(
    ['closeSectionPayload'],
    keys
);

export const selectModuleEditingName = createSelector(
    ['moduleEditingName'],
);

export const selectSections = createSelector<FullStoreShape, SectionEntity[]>(
    ['sections'],
    sections => {
        const activeSection = propEq('active', true);
        return filter(activeSection, sections);
    }
);

export const selectSectionsWithInactive = createSelector<FullStoreShape, SectionEntity[]>(
    ['sections'],
);


export const selectCurrentActiveSection = createSelector(
    ['currentActiveSection']
);

export const selectCurrentActiveSectionName = createSelector(
    [selectCurrentActiveSection, selectSections],
    (id: number, sections: SectionEntity[]) => prop('name', sections.find(propEq('id', id)))
);

export const selectSectionsAsOptions = createSelector<FullStoreShape, OptionType[]>(
    [selectSections, selectCurrentActiveSection, selectNamesFromSplit],
    (sections, current, namesFromSplit) => {
        const sectionsWithoutCurrent = reject(propEq('id', current), sections);
        const sortedWithNamesFromSplit = compose(sortBy(prop('name')),concat(sectionsWithoutCurrent, namesFromSplit))
        debugger
        const asOptions = map(({ name }: {name: string}) => ({ label: name, value: name }), sortedWithNamesFromSplit);
        return asOptions;
    }
);

// Note: higher order selectors will not memoize this way
export const selectExistingAsOptions = (existing: string[]) => createSelector(
    [selectSectionsAsOptions],
    (sectionsAsOptions: OptionType[]) => sectionsAsOptions.filter(({ value }) => includes(value, existing))
);

export const getSelectedOptions = (sections: number[]) => createSelector(
    [selectSectionsAsOptions],
    sectionsAsOptions => sectionsAsOptions.filter(
        (option: OptionType) => includes(option.value, sections)
    )
);

export const getOptionsWithoutExisting = (existing: string[]) => createSelector(
    [selectSectionsAsOptions, selectExistingAsOptions(existing)],
    (sectionsAsOptions, existingAsOptions) => without(existingAsOptions, sectionsAsOptions)
);

export const getExistingSectionsStr = (existing: string[]) => createSelector(
    [selectSections],
    (sections: SectionEntity[]) => sections
        .filter(section => existing.includes(section.name))
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
