import { createSelector } from 'redux-starter-kit';
import { interventionsWithoutCurrentSection } from './interventions';
import { travelsWithoutCurrentSection } from './travels';
import { tpmActivitiesWithoutCurrentSection } from './tpm-activities';
import { actionPointsWithoutCurrentSection } from './action-points';
import { notEmpty } from 'utils/helpers';
import { filter } from 'ramda';

// TODO: remove returning result from backend and just extract it in these filters
export const selectWithoutCurrentSection = createSelector(
    [
        interventionsWithoutCurrentSection,
        travelsWithoutCurrentSection,
        tpmActivitiesWithoutCurrentSection,
        actionPointsWithoutCurrentSection
    ],
    (interventions, travels, tpmActivities, actionPoints) => filter(
        notEmpty,
        ({
            interventions,
            travels,
            tpmActivities,
            actionPoints
        })
    )
);
