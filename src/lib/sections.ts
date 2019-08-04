import { reduce, keys } from 'ramda';
import { EntityWithSingleSection, SectionEntity } from 'entities/types';
import { CLOSE_SECTION_PREFIX } from 'global-constants';


export const clearCurrentSection = (entity: EntityWithSingleSection = {}) => {
    const res = keys(entity).reduce(
        (newEntity: EntityWithSingleSection, id: number) => {
            return { ...newEntity, [id]: { ...newEntity[id], section: undefined } };
        }, entity
    );
    return res;
};

export const buildResolvedProgressString = (...args: number[]): string => args.join('/');

export const getNumResolved = (entity: EntityWithSingleSection = {}): number[] => {
    const keysOfEntity = keys(entity);
    const numResolved = reduce(
        (sum: number, id: number) => {
            const obj = entity[id];
            if (obj.section) {
                sum++;
            }
            return sum;
        }, 0,
        keysOfEntity
    );
    return [numResolved, keysOfEntity.length];

};

export const prefixWithClose = (key: string) => `${CLOSE_SECTION_PREFIX}_${key}`;

