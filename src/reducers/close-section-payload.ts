import { createSlice } from 'redux-starter-kit';
import { ModuleEntities } from 'entities/types';
import { renderSectionsList } from 'actions/action-constants';

export const initialState: ModuleEntities = {
    interventions: {},
    travels: {},
    actionPoints: {},
    tpmActivities: {}
};

export const closeSectionPayload = createSlice({
    initialState,
    reducers: {
        onFetchFromStorageSuccess: (state, action) => action.payload,
        onFetchForCloseSuccess: (state, action) => action.payload,
        updateCloseSectionPayload: (state, action) => action.payload,
        onChangeInterventionSection: (state, action) => {
            const { id, sections } = action.payload;
            state.interventions[id].sections = sections;
        },
        onUpdateInterventionIndicatorsState: (state, action) => {
            const { indicators, id } = action.payload;
            (state).interventions[id].indicators = indicators;
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
            const { sections, id } = action.payload;
            state.tpmActivities[id].sections = sections;
        }
    },
    extraReducers: {
        [renderSectionsList.type]: () => initialState
    }
});

export const {
    onFetchFromStorageSuccess,
    updateCloseSectionPayload,
    onFetchForCloseSuccess,
    onUpdateTravelSection,
    onChangeInterventionSection,
    onUpdateActionPointSection,
    onUpdateTPMSections,
    onUpdateInterventionIndicatorsState
} = closeSectionPayload.actions;

export const { reducer: closeSectionPayloadReducer } = closeSectionPayload;
