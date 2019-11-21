import { createSlice } from '@reduxjs/toolkit';
import { ModuleEntities } from 'entities/types';
import { renderSectionsList } from 'actions/action-constants';

export const initialState: ModuleEntities = {
    interventions: {},
    travels: {},
    actionPoints: {},
    tpmActivities: {}
};

export const closeSectionPayload = createSlice({
    name: 'closeSectionPayload',
    initialState,
    reducers: {
        dataFromStorageReceived: (state, action) => action.payload,
        closeSectionDataReceived: (state, action) => action.payload,
        updateCloseSectionPayload: (state, action) => action.payload,
        onChangeInterventionSection: (state, action) => {
            const { id, sections } = action.payload;
            state.interventions[id].sections = sections;
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
        onUpdateTPMSections: (state, action) => {
            const { section, id } = action.payload;
            state.tpmActivities[id].section = section;
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
    onUpdateActionPointSection,
    onUpdateTPMSections,
    onUpdateInterventionIndicatorsState
} = closeSectionPayload.actions;

export const { reducer: closeSectionPayloadReducer } = closeSectionPayload;
