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
    engagements: {}
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
        engagementSectionSelected: (state, action) => {
            const { id, sections } = action.payload;
            state.engagements[id].sections = sections;
        },
        onUpdateInterventionIndicatorsState: (state, action) => {
            const { indicators, id } = action.payload;
            state.interventions[id].indicators = indicators;
        },
        onUpdateTravelSection: (state, action) => {
            const { section, id } = action.payload;
            state.travels[id].section = section;
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
        onUpdateFMActivitySections: (state, action) => {
            const { sections, id } = action.payload;
            state.fmActivities[id].sections = sections;
        },
        onUpdateFMQuestionSections: (state, action) => {
            const { sections, id } = action.payload;
            state.fmQuestions[id].sections = sections;
        }
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
    onChangeInterventionSection,
    engagementSectionSelected,
    onUpdateActionPointSection,
    onUpdateAllActionPointSection,
    onUpdateTPMSections,
    onUpdateFMActivitySections,
    onUpdateFMQuestionSections,
    onUpdateInterventionIndicatorsState
} = closeSectionPayload.actions;

export const { reducer: closeSectionPayloadReducer } = closeSectionPayload;
