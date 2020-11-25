import { createSelector } from '@reduxjs/toolkit';
import { FMQuestion, Normalized, ResolvedRatio, EntitiesAffected, Section } from 'entities/types';
import { selectCloseSectionPayload, selectCurrentActiveSection, selectSections } from 'selectors';
import { map, keys, prop, without, includes, reduce } from 'ramda';
import { FullStoreShape } from 'contexts/app';
import { clearCurrentSection } from 'lib/sections';
import { fmQuestionsSchema } from 'entities/schemas';
import { normalize } from 'normalizr';

export const selectFMQuestionsFromPayload = createSelector<
    FullStoreShape,
    EntitiesAffected,
    Normalized<FMQuestion>
>(
    [selectCloseSectionPayload],
    prop('fmQuestions')
);

export const selectFMQuestionsIds = createSelector(
    [selectFMQuestionsFromPayload],
    keys
);

export const fmQuestionsWithoutCurrentSection = createSelector(
    [selectCurrentActiveSection, selectFMQuestionsFromPayload, selectSections],
    (id: number, fmQuestions: Normalized<FMQuestion>, sectionsList: Section[]) => {
        const newQuestions = map((key: number) => {
            const question: FMQuestion = fmQuestions[key];
            const existingSectionsIds = without([id], question.sections);

            const existingSectionsNames: string[] = sectionsList
                .filter(({ id }) => includes(id, existingSectionsIds))
                .map(prop('name'));

            const result: FMQuestion = {
                ...question,
                sections: [],
                existingSections: existingSectionsNames
            };
            return result;
        }, keys(fmQuestions));

        const { entities } = normalize(newQuestions, [fmQuestionsSchema]);

        return entities.fmQuestions;
    }
);

export const getNumResolvedFMQuestions = createSelector(
    [selectFMQuestionsFromPayload],
    (fmQuestions: Normalized<FMQuestion> = {}): ResolvedRatio => {
        const resolved = reduce(
            (sum: number, key: string) => {
                const { sections }: { sections: string[] } = fmQuestions[key];
                if (sections && sections.length) {
                    sum++;
                }
                return sum;
            },
            0,
            keys(fmQuestions)
        );
        return { resolved, total: keys(fmQuestions).length };
    }
);
