import { createSelector } from 'redux-starter-kit';
import { selectSections, selectCurrentActiveSection } from 'selectors';
import { CloseSectionBackendPayload, BackendEntityNames, ActionPointEntity, InterventionEntity, Normalized, TravelEntity, SectionEntity, FormattedTPMActivityEntity } from 'entities/types';
import { Store } from 'slices/root-store';
import { selectInterventionsFromPayload } from './interventions';
import { selectTPMFromPayload } from './tpm-activities';
import { selectTravelsFromPayload } from './travels';
import { selectActionPointsFromPayload } from './action-points';
import { propEq, prop, keys } from 'ramda';

// this defines the shape of the payload for the POST request, the specific format is required by the backend
export const getCloseSectionBackendPayload = createSelector<Store, CloseSectionBackendPayload >(
    [selectActionPointsFromPayload, selectInterventionsFromPayload, selectTPMFromPayload, selectTravelsFromPayload, selectSections, selectCurrentActiveSection],
    (actionPoints: Normalized<ActionPointEntity>,
        interventions: Normalized<InterventionEntity>,
        tpmActivities: Normalized<FormattedTPMActivityEntity>,
        travels: Normalized<TravelEntity>,
        sections: SectionEntity[],
        oldSection: number) => {


        const payload: CloseSectionBackendPayload = {
            old_section: oldSection,
            new_sections: {}
        };

        keys(actionPoints).forEach(
            (id: string) => {
                const { section } = actionPoints[id];
                const sectionName = prop('name', sections.find(propEq('id', section)));
                persistToPayload(payload, sectionName, 'action_points', Number(id));
            }
        );

        keys(interventions).forEach(
            (id: string) => {
                const { sections, indicators } = interventions[id];
                sections.forEach(
                    section => {
                        const sectionName = prop('name', sections.find(propEq('id', section)));
                        persistToPayload(payload, sectionName, 'interventions', Number(id));
                    }
                );

                indicators.forEach(
                    ({ section, pk }) => {
                        const sectionName = prop('name', sections.find(propEq('id', section)));
                        persistToPayload(payload, sectionName, 'applied_indicators', pk);
                    }
                );
            }
        );

        keys(tpmActivities).forEach(
            (id: string) => {
                const { sections } = tpmActivities[id];
                sections.forEach(
                    section => {
                        const sectionName = prop('name', sections.find(propEq('id', section)));
                        persistToPayload(payload, sectionName, 'tpm_activities', Number(id));
                    }
                );
            }
        );

        keys(travels).forEach(
            (id: string) => {
                const { section } = travels[id];
                const sectionName = prop('name', sections.find(propEq('id', section)));
                persistToPayload(payload, sectionName, 'travels', Number(id));
            }
        );


        return payload;


        function persistToPayload(
            payload: CloseSectionBackendPayload,
            sectionName: string,
            entityName: BackendEntityNames,
            id: number) {

            const existingSection = payload.new_sections[sectionName];
            const entityValue = existingSection ? existingSection[entityName] || [] : [];
            payload.new_sections[sectionName] = {
                ...existingSection,
                [entityName]: [...entityValue, id]
            };
        }
    }
);
