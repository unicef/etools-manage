import { createSlice } from 'redux-starter-kit';
import { ModuleEntities } from 'entities/types';
import { selectWithoutCurrentSection } from 'selectors/filter-sections';

const initialState: ModuleEntities | {} = {};

export const closeSectionPayload = createSlice({
    initialState,
    reducers: {
        onFetchFromStorageSuccess: (state, action) => {
            state = action.payload;
        },
        onFetchForCloseSuccess: (state, action) => {
            state = action.payload;
            const withoutCurrentSection = selectWithoutCurrentSection(state);
            (state as ModuleEntities) = withoutCurrentSection;
        },
        updateCloseSectionPayload: (state, action) => {
            state = action.payload;
        },
        onChangeInterventionSection: (state, action) => {
            const { id, sections } = action.payload;
            (state as ModuleEntities).interventions[id].sections = sections;

        },
        onUpdateInterventionIndicatorsState: (state, action) => {
            const { indicators, id } = action.payload;
            (state as ModuleEntities).interventions[id].indicators = indicators;
        },
        onUpdateTravelSection: (state, action) => {
            const { section, id } = action.payload;
            (state as ModuleEntities).travels[id].section = section;
        },
        onUpdateActionPointSection: (state, action) => {
            const { section, id } = action.payload;
            (state as ModuleEntities).actionPoints[id].section = section;
        },
        onUpdateTPMSections: (state, action) => {
            const { sections, id } = action.payload;
            (state as ModuleEntities).tpmActivities[id].sections = sections;
        }
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
