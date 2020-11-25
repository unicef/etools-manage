import { createSelector } from '@reduxjs/toolkit';
import { interventionsWithoutCurrentSection } from './interventions';
import { travelsWithoutCurrentSection } from './travels';
import { tpmActivitiesWithoutCurrentSection } from './tpm-activities';
import { actionPointsWithoutCurrentSection } from './action-points';
import { notEmpty } from 'utils';
import { filter } from 'ramda';
import { engagementsWithoutCurrentSection } from './engagements';
import {fmActivitiesWithoutCurrentSection} from './fm-activities';
import {fmQuestionsWithoutCurrentSection} from './fm-questions';

export const selectWithoutCurrentSection = createSelector(
    [
        interventionsWithoutCurrentSection,
        travelsWithoutCurrentSection,
        tpmActivitiesWithoutCurrentSection,
        fmActivitiesWithoutCurrentSection,
        fmQuestionsWithoutCurrentSection,
        actionPointsWithoutCurrentSection,
        engagementsWithoutCurrentSection
    ],
    (interventions, travels, tpmActivities, fmActivities, fmQuestions, actionPoints, engagements) => {
        const res = filter(notEmpty, {
            interventions,
            travels,
            tpmActivities,
            fmActivities,
            fmQuestions,
            actionPoints,
            engagements
        });
        return res;
    }
);
