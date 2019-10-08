import { createSelector } from 'redux-starter-kit';
import { selectCurrentActiveSection, selectCloseSectionPayload } from 'selectors';
import {
    CloseSectionBackendPayload,
    BackendEntityNames,
    ActionPointEntity,
    InterventionEntity,
    Normalized,
    TravelEntity,
    ModuleEntities,
    TPMActivityEntity
} from 'entities/types';
import { selectInterventionsFromPayload } from './interventions';
import { selectTPMFromPayload } from './tpm-activities';
import { selectTravelsFromPayload } from './travels';
import { selectActionPointsFromPayload } from './action-points';
import { keys, equals } from 'ramda';
import { FullStoreShape } from 'contexts/app';
import { selectNamesFromsplit } from './split-section';
import { Dictionary } from 'helpers';
import { initialState } from 'reducers/close-section-payload';

// this defines the shape of the payload for the POST request, the specific format is required by the backend
export const getCloseSectionBackendPayload = createSelector<
    FullStoreShape,
    CloseSectionBackendPayload
>(
    [
        selectActionPointsFromPayload,
        selectInterventionsFromPayload,
        selectTPMFromPayload,
        selectTravelsFromPayload,
        selectCurrentActiveSection,
        selectNamesFromsplit
    ],
    (
        actionPoints: Normalized<ActionPointEntity>,
        interventions: Normalized<InterventionEntity>,
        tpmActivities: Normalized<TPMActivityEntity>,
        travels: Normalized<TravelEntity>,
        oldSection: number,
        namesFromSplit: string[]
    ) => {
        const payload: CloseSectionBackendPayload = {
            old_section: oldSection,
            new_sections: namesFromSplit.reduce((obj: Dictionary<{}>, name) => {
                obj[name] = {};
                return obj;
            }, {})
        };

        keys(actionPoints).forEach((id: string) => {
            const { section } = actionPoints[id];
            persistToPayload(payload, section, 'action_points', Number(id));
        });

        keys(interventions).forEach((id: string) => {
            const { sections: selectedSections, indicators } = interventions[id];
            selectedSections.forEach((section: string) => {
                persistToPayload(payload, section, 'interventions', Number(id));
            });

            indicators.forEach(({ section, pk }) => {
                persistToPayload(payload, section, 'applied_indicators', pk);
            });
        });

        keys(tpmActivities).forEach((id: string) => {
            const { section } = tpmActivities[id];
            persistToPayload(payload, section, 'tpm_activities', Number(id));
        });

        keys(travels).forEach((id: string) => {
            const { section } = travels[id];
            persistToPayload(payload, section, 'travels', Number(id));
        });

        return payload;

        function persistToPayload(
            payload: CloseSectionBackendPayload,
            sectionName: string,
            entityName: BackendEntityNames,
            id: number
        ) {
            const existingSection = payload.new_sections[sectionName];
            const entityValue = existingSection ? existingSection[entityName] || [] : [];
            payload.new_sections[sectionName] = {
                ...existingSection,
                [entityName]: [...entityValue, id]
            };
        }
    }
);

export const deriveCloseSectionFetched = createSelector(
    [selectCloseSectionPayload],
    (payload: ModuleEntities) => {
        if (!payload || equals(payload, initialState)) {
            return false;
        }
        return true;
    }
);
