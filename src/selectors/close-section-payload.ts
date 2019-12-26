import { createSelector } from '@reduxjs/toolkit';
import { selectCurrentActiveSection, selectCloseSectionPayload } from 'selectors';
import {
    CloseSectionBackendPayload,
    BackendEntityNames,
    ActionPoint,
    Intervention,
    Normalized,
    Travel,
    EntitiesAffected,
    TPMActivity,
    SectionToEntity,
    Engagement
} from 'entities/types';
import { selectInterventionsFromPayload } from './interventions';
import { selectTPMFromPayload } from './tpm-activities';
import { selectTravelsFromPayload } from './travels';
import { selectActionPointsFromPayload } from './action-points';
import { keys, equals } from 'ramda';
import { FullStoreShape } from 'contexts/app';
import { selectNamesFromsplit } from './split-section';
import { initialState } from 'slices/close-section-payload';
import { selectEngagementsFromPayload } from './engagements';

// this defines the shape of the payload for the POST request, the specific format is required by the backend
export const getCloseSectionBackendPayload = createSelector<
    FullStoreShape,
    Normalized<ActionPoint>,
    Normalized<Intervention>,
    Normalized<TPMActivity>,
    Normalized<Travel>,
    Normalized<Engagement>,
    number,
    string[],
    CloseSectionBackendPayload
>(
    [
        selectActionPointsFromPayload,
        selectInterventionsFromPayload,
        selectTPMFromPayload,
        selectTravelsFromPayload,
        selectEngagementsFromPayload,
        selectCurrentActiveSection,
        selectNamesFromsplit
    ],
    (
        actionPoints,
        interventions,
        tpmActivities,
        travels,
        engagements,
        oldSection,
        namesFromSplit: string[]
    ) => {
        const payload: CloseSectionBackendPayload = {
            old_section: oldSection,
            new_sections: namesFromSplit.reduce((obj: SectionToEntity, name) => {
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

        keys(engagements).forEach((id: string) => {
            const { sections } = engagements[id];
            sections.forEach((section: string) => {
                persistToPayload(payload, section, 'engagements', Number(id));
            });
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
    (payload: EntitiesAffected) => {
        if (!payload || equals(payload, initialState)) {
            return false;
        }
        return true;
    }
);
