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
import {partnersWithoutCurrentSection} from './partners';

export const selectWithoutCurrentSection = createSelector(
    [
        interventionsWithoutCurrentSection,
        partnersWithoutCurrentSection,
        travelsWithoutCurrentSection,
        tpmActivitiesWithoutCurrentSection,
        fmActivitiesWithoutCurrentSection,
        fmQuestionsWithoutCurrentSection,
        actionPointsWithoutCurrentSection,
        engagementsWithoutCurrentSection
    ],
    (interventions, partners, travels, tpmActivities, fmActivities, fmQuestions, actionPoints, engagements) => {
        const res = filter(notEmpty, {
            interventions,
            partners,
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
