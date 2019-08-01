import { set, lensProp, map, reduce } from 'ramda';
import { EntityWithSingleSection, SectionEntity } from 'entities/types';
import { CLOSE_SECTION_PREFIX } from 'global-constants';

const setSectionToUndefined = set(lensProp('section'), undefined);

export const clearCurrentSection = (list: EntityWithSingleSection[] = []) => map(setSectionToUndefined, list);

export const buildResolvedProgressString = (...args: number[]): string => args.join('/');

export const getNumResolved = (list: EntityWithSingleSection[] = []): number[] => {
    const numResolved = reduce(
        (sum: number, { section }: {section: number | SectionEntity}) => {
            if (section) {
                sum++;
            }
            return sum;
        }, 0,
        list
    );
    return [numResolved, list.length];

};

export const prefixWithClose = (key: string) => `${CLOSE_SECTION_PREFIX}_${key}`;

