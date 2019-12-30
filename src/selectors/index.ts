import { createSelector } from '@reduxjs/toolkit';
import { EntitiesAffected, Section } from 'entities/types';
import { propEq, reject, map, prop, includes, without, filter, keys, concat, sortBy } from 'ramda';
import { OptionType } from 'components/dropdown';
import { FullStoreShape } from 'contexts/app';
import { selectSectionsFromSplit } from './split-section';

export const selectError: (state: FullStoreShape) => string = state => state.error;

export const selectMergedSection: (state: FullStoreShape) => Section | null = state =>
    state.mergedSection;

export const selectCreatedSection: (state: FullStoreShape) => Section | null = state =>
    state.createdSection;

export const selectClosedSectionSuccess: (state: FullStoreShape) => boolean = state =>
    state.closedSectionSuccess;

export const selectCloseSectionPayload: (state: FullStoreShape) => EntitiesAffected = state =>
    state.closeSectionPayload;

export const selectLoading: (state: FullStoreShape) => boolean = state => state.loading;

export const selectCloseSectionPayloadKeys = createSelector(
    selectCloseSectionPayload,
    keys
);

export const selectModuleEditingName = (state: FullStoreShape) => state.moduleEditingName;

export const selectAllSections: (state: FullStoreShape) => Section[] = state => state.sections;

export const selectSections = createSelector<FullStoreShape, Section[], Section[]>(
    [selectAllSections],
    sections => {
        const activeSection = propEq('active', true);
        const activeSections = filter(activeSection, sections);
        return activeSections;
    }
);

export const selectCurrentActiveSection: (state: FullStoreShape) => number = state =>
    state.currentActiveSectionId;

export const selectCurrentActiveSectionName = createSelector<
    FullStoreShape,
    number,
    Section[],
    string
>(
    [selectCurrentActiveSection, selectSections],
    (id: number, sections: Section[]) => prop('name', sections.find(propEq('id', id)))
);

export const selectSectionsAsDropdownOptions = createSelector<
    FullStoreShape,
    Section[],
    number,
    Section[],
    OptionType[]
>(
    [selectSections, selectCurrentActiveSection, selectSectionsFromSplit],
    (sections, current, namesFromSplit) => {
        const sectionsWithoutCurrent = reject(propEq('id', current), sections);
        const sortedWithNamesFromSplit = sortBy(
            prop('name'),
            concat(sectionsWithoutCurrent, namesFromSplit)
        );
        const asOptions = map(
            ({ name }: { name: string }) => ({ label: name, value: name }),
            sortedWithNamesFromSplit
        );
        return asOptions;
    }
);

// These higher order selectors will not memoize , only used for consistency here
export const selectExistingAsOptions: (
    existing: string[]
) => (state: FullStoreShape) => OptionType[] = existing =>
    createSelector(
        [selectSectionsAsDropdownOptions],
        sectionsAsOptions => sectionsAsOptions.filter(({ value }) => includes(value, existing))
    );

export const getSelectedOptions: (
    sections: string[]
) => (state: FullStoreShape) => OptionType[] = sections =>
    createSelector(
        [selectSectionsAsDropdownOptions],
        sectionsAsOptions =>
            sectionsAsOptions.filter((option: OptionType) => includes(option.value, sections))
    );

export const getOptionsWithoutExisting: (
    existing: string[]
) => (state: FullStoreShape) => OptionType[] = existing =>
    createSelector(
        [selectSectionsAsDropdownOptions, selectExistingAsOptions(existing)],
        (sectionsAsOptions, existingAsOptions) => without(existingAsOptions, sectionsAsOptions)
    );

export const getExistingSectionsStr: (
    existing: string[]
) => (state: FullStoreShape) => string = existing =>
    createSelector(
        [selectSections],
        sections =>
            sections
                .filter(section => existing.includes(section.name))
                .map(prop('name'))
                .join(',')
    );
