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
import {getNumResolvedPartners} from './partners';

export const selectNumItemsResolved = createSelector(
    [
        getNumResolvedInterventions,
        getNumResolvedTravels,
        getNumResolvedActionPoints,
        getNumResolvedTPMActivities,
        getNumResolvedFMActivities,
        getNumResolvedFMQuestions,
        getNumResolvedEngagements,
        getNumResolvedPartners
    ],
    (
        interventions: ResolvedRatio,
        travels: ResolvedRatio,
        actionPoints: ResolvedRatio,
        tpmActivities: ResolvedRatio,
        fmActivities: ResolvedRatio,
        fmQuestions: ResolvedRatio,
        engagements: ResolvedRatio,
        partners: ResolvedRatio
    ) => ({ interventions, travels, actionPoints, tpmActivities, fmActivities, fmQuestions, engagements, partners })
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
        getNumResolvedEngagements,
        getNumResolvedPartners
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
