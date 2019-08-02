import { reduce, keys } from 'ramda';
import { EntityWithSingleSection } from 'entities/types';
import { CLOSE_SECTION_PREFIX } from 'global-constants';

export const normDefault = { data: {}, result: [] };

export const clearCurrentSection = (root: EntityWithSingleSection = normDefault) => {
    const entity = root.data;
    const res = keys(entity).reduce(
        (newEntity: typeof entity, id: number) => {
            return { ...newEntity, [id]: { ...newEntity[id], section: undefined } };
        }, entity
    );

    return {
        data: res,
        result: root.result
    };
};

export const buildResolvedProgressString = (...args: number[]): string => args.join('/');

export const getNumResolved = (root: EntityWithSingleSection = normDefault): number[] => {
    const entity = root.data;
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

