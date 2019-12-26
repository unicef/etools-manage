import { createSelector } from '@reduxjs/toolkit';
import { interventionsWithoutCurrentSection } from './interventions';
import { travelsWithoutCurrentSection } from './travels';
import { tpmActivitiesWithoutCurrentSection } from './tpm-activities';
import { actionPointsWithoutCurrentSection } from './action-points';
import { notEmpty } from 'utils';
import { filter } from 'ramda';
import { engagementsWithoutCurrentSection } from './engagements';

export const selectWithoutCurrentSection = createSelector(
    [
        interventionsWithoutCurrentSection,
        travelsWithoutCurrentSection,
        tpmActivitiesWithoutCurrentSection,
        actionPointsWithoutCurrentSection,
        engagementsWithoutCurrentSection
    ],
    (interventions, travels, tpmActivities, actionPoints, engagements) => {
        const res = filter(notEmpty, {
            interventions,
            travels,
            tpmActivities,
            actionPoints,
            engagements
        });
        return res;
    }
);
