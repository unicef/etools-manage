import { getNumResolvedInterventions } from './interventions';
import { getNumResolvedTPMActivities } from './tpm-activities';
import { getNumResolvedActionPoints } from './action-points';
import { getNumResolvedTravels } from './travels';
import { createSelector } from 'redux-starter-kit';
import { ResolvedRatio } from 'entities/types';
import { sum, map, prop } from 'ramda';
import { FullStoreShape } from 'contexts/app';

export const selectNumItemsResolved = createSelector(
    [
        getNumResolvedInterventions,
        getNumResolvedTravels,
        getNumResolvedActionPoints,
        getNumResolvedTPMActivities
    ],
    (
        interventions: ResolvedRatio,
        travels: ResolvedRatio,
        actionPoints: ResolvedRatio,
        tpmActivities: ResolvedRatio
    ) => ({ interventions, travels, actionPoints, tpmActivities })
);

export const selectTotalProgress = createSelector<FullStoreShape, number>(
    [
        getNumResolvedInterventions,
        getNumResolvedTravels,
        getNumResolvedActionPoints,
        getNumResolvedTPMActivities
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
