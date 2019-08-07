import { reduce, keys, always, map, T, isNil, cond, prop, propEq } from 'ramda';
import { EntityWithSingleSection, ResolvedRatio } from 'entities/types';
import { CLOSE_SECTION_PREFIX } from 'global-constants';
import { OptionType } from 'components/dropdown';


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

export const prefixWithClose = (key: string) => `${CLOSE_SECTION_PREFIX}_${key}`;

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


