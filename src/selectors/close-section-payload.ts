import { createSelector } from 'redux-starter-kit';
import { selectCloseSectionPayload, selectSections, selectCurrentActiveSection } from 'selectors';
import { CloseSectionBackendPayload, ModuleEntities, BackendEntityNames, SectionToEntity, ActionPointEntity, InterventionEntity, TPMActivityEntity, Normalized, TravelEntity, SectionEntity, FormattedTPMActivityEntity } from 'entities/types';
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

        keys(actionPoints).map(
            (id: string) => {
                const { section } = actionPoints[id];
                const sectionName = prop('name', sections.find(propEq('id', section)));
                persistToPayload(payload, sectionName, 'action_points', section);
            }
        );

        keys(interventions).map(
            (id: string) => {
                const { sections, indicators } = interventions[id];
                sections.map(
                    section => {
                        const sectionName = prop('name', sections.find(propEq('id', section)));
                        persistToPayload(payload, sectionName, 'interventions', section);
                    }
                );

                indicators.map(
                    ({ section }) => {
                        const sectionName = prop('name', sections.find(propEq('id', section)));
                        persistToPayload(payload, sectionName, 'applied_indicators', section as number);
                    }
                );
            }
        );

        keys(tpmActivities).map(
            (id: string) => {
                const { sections } = tpmActivities[id];
                sections.map(
                    section => {
                        const sectionName = prop('name', sections.find(propEq('id', section)));
                        persistToPayload(payload, sectionName, 'tpm_activities', section);
                    }
                );
            }
        );

        keys(travels).map(
            (id: string) => {
                const { section } = travels[id];
                const sectionName = prop('name', sections.find(propEq('id', section)));
                persistToPayload(payload, sectionName, 'travels', section);
            }
        );


        return payload;


        function persistToPayload(
            payload: CloseSectionBackendPayload,
            sectionName: string,
            entityName: BackendEntityNames,
            value: number) {

            const existingSection = payload.new_sections[sectionName];
            const entityValue = existingSection ? existingSection[entityName] : [];
            payload.new_sections[sectionName] = {
                ...existingSection,
                [entityName]: [...entityValue, value]
            };
        }
    }
);
