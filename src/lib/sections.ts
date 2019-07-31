import { set, lensProp, map, reduce } from 'ramda';
import { EntityWithSingleSection, SectionEntity } from 'entities/types';

const setSectionToUndefined = set(lensProp('section'), undefined);

export const clearCurrentSection = (list: EntityWithSingleSection[] = []) => map(setSectionToUndefined, list);

export const getNumResolved = (list: EntityWithSingleSection[] = []): string => {
    let numResolved = reduce(
    (sum: number, { section }: {section: number | SectionEntity}) => {
        if (section) {
            sum++;
        }
        return sum;
    }, 0,
    list
    );
    return `${numResolved}/${list.length}`

}
