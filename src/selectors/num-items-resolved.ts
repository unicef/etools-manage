import { getNumResolvedInterventions } from './interventions';
import { getNumResolvedTPMActivities } from './tpm-activities';
import { getNumResolvedActionPoints } from './action-points';
import { getNumResolvedTravels } from './travels';
import createSelector from 'selectorator';
import { ResolvedRatio } from 'entities/types';
import { sum, map, prop } from 'ramda';
import { Store } from 'slices/root-store';

export const selectNumItemsResolved = createSelector(
    [
        getNumResolvedInterventions,
        getNumResolvedTravels,
        getNumResolvedActionPoints,
        getNumResolvedTPMActivities
    ],
    (interventions: ResolvedRatio,
        travels: ResolvedRatio,
        actionPoints: ResolvedRatio,
        tpmActivities: ResolvedRatio
    ) => ({ interventions, travels, actionPoints, tpmActivities })

);

export const selectTotalProgress = createSelector<Store, number>(
    [
        getNumResolvedInterventions,
        getNumResolvedTravels,
        getNumResolvedActionPoints,
        getNumResolvedTPMActivities
    ],
    (...args: ResolvedRatio[]) => {
        const resolvedTotal = sum(map(prop('resolved'), args));
        const sumTotal = sum(map(prop('total'), args));
        return Math.round((resolvedTotal / sumTotal) * 100);
    }

);
