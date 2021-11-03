import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntitiesAffected } from 'entities/types';
import { renderSectionsList } from 'actions/action-constants';

export const initialState: EntitiesAffected = {
    interventions: {},
    travels: {},
    actionPoints: {},
    tpmActivities: {},
    fmActivities: {},
    fmQuestions: {},
    engagements: {},
    partners: {}
};

export const closeSectionPayload = createSlice({
    name: 'closeSectionPayload',
    initialState,
    reducers: {
        dataFromStorageReceived: (state, action) => action.payload,
        closeSectionDataReceived: (state, action) => action.payload,
        updateCloseSectionPayload: (state, action: PayloadAction<EntitiesAffected>) =>
            action.payload,
        onChangeInterventionSection: (state, action) => {
            const { id, sections } = action.payload;
            state.interventions[id].sections = sections;
        },
        onChangeAllInterventionSection: (state, action) => {
            const interventions = {...state.interventions};
            const { sections } = action.payload;
            const indicatorSection = sections.length ? sections[0] : '';
            Object.keys(interventions).forEach(key => {
                interventions[key].sections = sections;
                interventions[key].indicators.forEach(ind => ind.section = indicatorSection);
            });
            state.interventions = interventions;
        },
        engagementSectionSelected: (state, action) => {
            const { id, sections } = action.payload;
            state.engagements[id].sections = sections;
        },
        engagementAllSectionSelected: (state, action) => {
            const engagements = {...state.engagements};
            const { sections } = action.payload;
            Object.keys(engagements).forEach(key => {
                engagements[key].sections = sections;
            });
            state.engagements = engagements;
        },
        onUpdateInterventionIndicatorsState: (state, action) => {
            const { indicators, id } = action.payload;
            state.interventions[id].indicators = indicators;
        },
        onUpdateTravelSection: (state, action) => {
            const { section, id } = action.payload;
            state.travels[id].section = section;
        },
        onUpdateAllTravelSection: (state, action) => {
            const travels = {...state.travels};
            Object.keys(travels).forEach(key => {
                travels[key].section = action.payload;
            });
            state.travels = travels;
        },
        onUpdateActionPointSection: (state, action) => {
            const { section, id } = action.payload;
            state.actionPoints[id].section = section;
        },
        onUpdateAllActionPointSection: (state, action) => {
            const actionsPoints = {...state.actionPoints};
            Object.keys(actionsPoints).forEach(key => {
                actionsPoints[key].section = action.payload;
            });
            state.actionPoints = actionsPoints;
        },
        onUpdateTPMSections: (state, action) => {
            const { section, id } = action.payload;
            state.tpmActivities[id].section = section;
        },
        onUpdateAllTPMSections: (state, action) => {
            const tpmActivities = {...state.tpmActivities};
            Object.keys(tpmActivities).forEach(key => {
                tpmActivities[key].section = action.payload;
            });
            state.tpmActivities = tpmActivities;
        },
        onUpdateFMActivitySections: (state, action) => {
            const { sections, id } = action.payload;
            state.fmActivities[id].sections = sections;
        },
        onUpdateAllFMActivitySections: (state, action) => {
            const fmActivities = {...state.fmActivities};
            const { sections } = action.payload;
            Object.keys(fmActivities).forEach(key => {
                fmActivities[key].sections = sections;
            });
            state.fmActivities = fmActivities;
        },
        onUpdateFMQuestionSections: (state, action) => {
            const { sections, id } = action.payload;
            state.fmQuestions[id].sections = sections;
        },
        onUpdateAllFMQuestionSections: (state, action) => {
            const fmQuestions = {...state.fmQuestions};
            const { sections } = action.payload;
            Object.keys(fmQuestions).forEach(key => {
                fmQuestions[key].sections = sections;
            });
            state.fmQuestions = fmQuestions;
        },
        onUpdatePartnerSection: (state, action) => {
            const { section, id } = action.payload;
            state.partners[id].lead_section = section;
        },
        onUpdateAllPartnerSection: (state, action) => {
            const partners = {...state.partners};
            Object.keys(partners).forEach(key => {
                partners[key].lead_section = action.payload;
            });
            state.partners = partners;
        },
    },
    extraReducers: {
        [renderSectionsList.type]: () => initialState
    }
});

export const {
    dataFromStorageReceived,
    updateCloseSectionPayload,
    closeSectionDataReceived,
    onUpdateTravelSection,
    onUpdateAllTravelSection,
    onChangeInterventionSection,
    onChangeAllInterventionSection,
    engagementSectionSelected,
    engagementAllSectionSelected,
    onUpdateActionPointSection,
    onUpdateAllActionPointSection,
    onUpdateTPMSections,
    onUpdateAllTPMSections,
    onUpdateFMActivitySections,
    onUpdateAllFMActivitySections,
    onUpdateFMQuestionSections,
    onUpdateAllFMQuestionSections,
    onUpdateInterventionIndicatorsState,
    onUpdatePartnerSection,
    onUpdateAllPartnerSection
} = closeSectionPayload.actions;

export const { reducer: closeSectionPayloadReducer } = closeSectionPayload;
