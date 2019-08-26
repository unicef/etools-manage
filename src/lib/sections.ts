import {
    reduce,
    keys,
    always,
    map,
    T,
    isNil,
    cond,
    prop,
    propEq,
    includes,
    reject,
    allPass,
    isEmpty
} from 'ramda';
import {
    EntityWithSingleSection,
    ResolvedRatio,
    FetchStoragePayload,
    ModuleEntities,
    SectionEntity
} from 'entities/types';
import { OptionType } from 'components/dropdown';
import { FullStoreShape } from 'contexts/app';
import {
    CLOSE_SECTION_PREFIX,
    SPLIT_SECTION_PREFIX,
    SPLIT_SECTION_PATH,
    CLOSE_SECTION_PATH
} from 'global-constants';

export const clearCurrentSection = (entity: EntityWithSingleSection = {}) => {
    const res = keys(entity).reduce((newEntity: EntityWithSingleSection, id: number) => {
        return { ...newEntity, [id]: { ...newEntity[id], section: null } };
    }, entity);
    return res;
};

export const buildResolvedProgressString = ({ resolved, total }: ResolvedRatio): string =>
    `${resolved}/${total}`;

export const getNumResolved = (entity: EntityWithSingleSection = {}): ResolvedRatio => {
    const keysOfEntity = keys(entity);
    const resolved = reduce(
        (sum: number, id: number) => {
            const obj = entity[id];
            if (obj.section) {
                sum++;
            }
            return sum;
        },
        0,
        keysOfEntity
    );
    return { resolved, total: keysOfEntity.length };
};

export const prefixWithClose = (state: FullStoreShape) =>
    // @ts-ignore
    `${CLOSE_SECTION_PREFIX}_${state.currentActiveSection}_${state.user.country.name}`;
export const getCloseSectionPrefixKey = (payload: FetchStoragePayload) =>
    `${CLOSE_SECTION_PREFIX}_${payload.id}_${payload.countryName}`;

export const prefixWithSplit = (state: FullStoreShape) =>
    // @ts-ignore
    `${SPLIT_SECTION_PREFIX}_${state.currentActiveSection}_${state.user.country.name}`;
export const getSplitSectionPrefixKey = (payload: FetchStoragePayload) =>
    `${SPLIT_SECTION_PREFIX}_${payload.id}_${payload.countryName}`;

export const parseKeyForId = (key: string) => {
    return key.split('_')[1];
};
export const parseKeyForAction = (key: string) => key.split('_')[0];

export const filterDuplicateClose = (keys: string[]) => {
    const splitIds = keys.filter((key: string) => key.includes('split')).map(parseKeyForId);

    const isCloseAction = includes('close');
    const isCloseFromSplit = (key: string) => includes(parseKeyForId(key), splitIds);

    // We remove a close section action if split exists for that section
    const removeDuplicateClose = reject(allPass([isCloseAction, isCloseFromSplit]));

    return removeDuplicateClose(keys);
};

export const isCurrentCountry = (countryName: string) => (key: string) => key.includes(countryName);

export const valueOrDefault = cond([[isNil, always([])], [T, map(prop('value'))]]);

export const getSelectedSection = (options: OptionType[], section: string) =>
    options.find(propEq('value', section)) || null;

export function isSectionsParamValid(str: string): boolean {
    if (!str.length) {
        return false;
    }
    const sections = str.split(',');
    const sectionsStringValid = sections.reduce((acc, next): boolean => {
        const sectionIdIsNumber = !isNaN(Number(next));
        return sectionIdIsNumber && acc;
    }, true);
    return sectionsStringValid;
}

export const getSplitSectionUrl = (id: string) => `${SPLIT_SECTION_PATH}${id}`;
export const getCloseSectionUrl = (id: string) => `${CLOSE_SECTION_PATH}${id}`;

export const hasModulesData = (data: ModuleEntities) => {
    return keys(data).reduce(
        (notEmpty: boolean, key: keyof ModuleEntities) => notEmpty && !isEmpty(data[key]),
        true
    );
};

export function sectionWithNumberId(section: SectionEntity): SectionEntity {
    return {
        ...section,
        id: Number(section.id)
    };
}
