import { reduce, keys, always, map, T, isNil, cond, prop, propEq } from 'ramda';
import { EntityWithSingleSection, ResolvedRatio, FetchStoragePayload } from 'entities/types';
import { OptionType } from 'components/dropdown';
import { FullStoreShape } from 'contexts/app';
import { CLOSE_SECTION_PREFIX } from 'global-constants';

export const clearCurrentSection = (entity: EntityWithSingleSection = {}) => {
    const res = keys(entity).reduce(
        (newEntity: EntityWithSingleSection, id: number) => {
            return { ...newEntity, [id]: { ...newEntity[id], section: null } };
        }, entity
    );
    return res;
};

export const buildResolvedProgressString = ({ resolved, total }: ResolvedRatio): string => `${resolved}/${total}`;

export const getNumResolved = (entity: EntityWithSingleSection = {}): ResolvedRatio => {
    const keysOfEntity = keys(entity);
    const resolved = reduce(
        (sum: number, id: number) => {
            const obj = entity[id];
            if (obj.section) {
                sum++;
            }
            return sum;
        }, 0,
        keysOfEntity
    );
    return { resolved, total: keysOfEntity.length };

};

// @ts-ignore
export const prefixWithClose = (state: FullStoreShape) => `${CLOSE_SECTION_PREFIX}_${state.currentActiveSection}_${state.user.country.name}`;
export const getCloseSectionPrefixKey = (payload: FetchStoragePayload) => `${CLOSE_SECTION_PREFIX}_${payload.id}_${payload.countryName}`;

export const valueOrDefault = cond([
    [isNil, always([])],
    [T, map(prop('value'))]
]);

export const getSelectedSection = (options: OptionType[], section: number) => options.find(propEq('value', section)) || null;

export function isSectionsParamValid(str: string): boolean {
    if (!str.length) {
        return false;
    }
    const sections = str.split(',');
    const sectionsStringValid = sections.reduce(
        (acc, next): boolean => {
            const sectionIdIsNumber = !isNaN(Number(next));
            return sectionIdIsNumber && acc;
        }, true);
    return sectionsStringValid;
}


