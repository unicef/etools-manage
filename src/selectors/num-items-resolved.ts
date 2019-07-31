import { getNumResolvedInterventions } from "./interventions";
import { getNumResolvedTPMActivities } from "./tpm-activities";
import { getNumResolvedActionPoints } from "./action-points";
import { getNumResolvedTravels } from "./travels";
import createSelector from "selectorator";

export const selectNumItemsResolved = createSelector(
    [
        getNumResolvedInterventions,
        getNumResolvedTravels,
        getNumResolvedActionPoints,
        getNumResolvedTPMActivities
    ],
    (interventions:string,travels:string,actionPoints: string,tpmActivities: string)=> ({interventions,travels,actionPoints,tpmActivities})
      
);
