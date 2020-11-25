import { getNumResolvedInterventions } from './interventions';
import { getNumResolvedTPMActivities } from './tpm-activities';
import { getNumResolvedActionPoints } from './action-points';
import { getNumResolvedTravels } from './travels';
import { createSelector } from '@reduxjs/toolkit';
import { ResolvedRatio } from 'entities/types';
import { sum, map, prop } from 'ramda';
import { FullStoreShape } from 'contexts/app';
import { getNumResolvedEngagements } from './engagements';
import {getNumResolvedFMActivities} from './fm-activities';
import {getNumResolvedFMQuestions} from './fm-questions';

export const selectNumItemsResolved = createSelector(
    [
        getNumResolvedInterventions,
        getNumResolvedTravels,
        getNumResolvedActionPoints,
        getNumResolvedTPMActivities,
        getNumResolvedFMActivities,
        getNumResolvedFMQuestions,
        getNumResolvedEngagements
    ],
    (
        interventions: ResolvedRatio,
        travels: ResolvedRatio,
        actionPoints: ResolvedRatio,
        tpmActivities: ResolvedRatio,
        fmActivities: ResolvedRatio,
        fmQuestions: ResolvedRatio,
        engagements: ResolvedRatio,
    ) => ({ interventions, travels, actionPoints, tpmActivities, fmActivities, fmQuestions, engagements })
);

export const selectTotalProgress = createSelector<
    FullStoreShape,
    ResolvedRatio,
    ResolvedRatio,
    ResolvedRatio,
    ResolvedRatio,
    ResolvedRatio,
    ResolvedRatio,
    ResolvedRatio,
    number
>(
    [
        getNumResolvedInterventions,
        getNumResolvedTravels,
        getNumResolvedActionPoints,
        getNumResolvedTPMActivities,
        getNumResolvedFMActivities,
        getNumResolvedFMQuestions,
        getNumResolvedEngagements
    ],
    (...args: ResolvedRatio[]) => {
        const resolvedTotal = sum(map(prop('resolved'), args));
        const sumTotal = sum(map(prop('total'), args));

        if (sumTotal === 0) {
            return 0;
        }
        return Math.round((resolvedTotal / sumTotal) * 100);
    }
);
