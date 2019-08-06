import { getNumResolvedInterventions } from './interventions';
import { getNumResolvedTPMActivities } from './tpm-activities';
import { getNumResolvedActionPoints } from './action-points';
import { getNumResolvedTravels } from './travels';
import createSelector from 'selectorator';
import { ResolvedRatio } from 'entities/types';

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
