import { createSlice } from 'redux-starter-kit';
import { SectionEntity, NewSectionFromMerged, ModuleEntities } from 'entities/types';
import { selectWithoutCurrentSection } from 'selectors/filter-sections';
import { refreshSectionsList } from 'actions';

export interface Store {
    sections: SectionEntity[];
    createdSection: SectionEntity | null;
    mergedSection: NewSectionFromMerged | null;
    error: string | null;
    loading: boolean;
    closeSectionPayload: ModuleEntities | null;
    moduleEditingName: keyof ModuleEntities | null;
    currentActiveSection: number | null;
    closedSectionSuccess: boolean;
}

export const initialState: Store = {
    sections: [],
    createdSection: null,
    mergedSection: null,
    error: null,
    loading: false,
    closeSectionPayload: null,
    moduleEditingName: null,
    currentActiveSection: null,
    closedSectionSuccess: false
};

// TODO: split up reducers using combineReducers
const storeSlice = createSlice({
    initialState,
    reducers: {
        onGetSectionsSuccess: (state, action) => {
            state.sections = action.payload;
        },
        onCreateSectionSuccess: (state, action) => {
            state.createdSection = action.payload;
            state.loading = false;
        },
        onResetCreatedSection: state => {
            state.createdSection = null;
        },
        onThrowError: (state, action) => {
            state.error = action.payload;
        },
        // TODO: add toggling to middleware
        onSetLoading: (state, action) => {
            state.loading = action.payload;
        },
        onSetMergedSection: (state, action) => {
            state.mergedSection = action.payload;
            state.loading = false;
        },
        onFetchFromStorageSuccess: (state, action) => {
            state.closeSectionPayload = action.payload;
        },
        onFetchForCloseSuccess: (state, action) => {
            state.closeSectionPayload = action.payload;
            const withoutCurrentSection = selectWithoutCurrentSection(state);
            state.closeSectionPayload = withoutCurrentSection;
            state.loading = false;
        },
        onSetModuleEditingName: (state, action) => {
            state.moduleEditingName = action.payload;
        },
        updateCloseSectionPayload: (state, action) => {
            state.closeSectionPayload = action.payload;
        },
        onCurrentActiveSection: (state, action) => {
            state.currentActiveSection = action.payload;
        },
        onSuccessCloseSection: (state, action) => {
            state.closedSectionSuccess = action.payload;
            state.loading = false;
        },
        onChangeInterventionSection: (state, action) => {
            const { id, sections } = action.payload;
            if (state.closeSectionPayload) {
                state.closeSectionPayload.interventions[id].sections = sections;
            } else {
                return state;
            }
        },
        onUpdateInterventionIndicatorsState: (state, action) => {
            const { indicators, id } = action.payload;
            if (state.closeSectionPayload) {
                state.closeSectionPayload.interventions[id].indicators = indicators;
            }
        },
        onUpdateTravelSection: (state, action) => {
            const { section, id } = action.payload;
            (state.closeSectionPayload as ModuleEntities).travels[id].section = section;
        },
        onUpdateActionPointSection: (state, action) => {
            const { section, id } = action.payload;
            (state.closeSectionPayload as ModuleEntities).actionPoints[id].section = section;
        },
        onUpdateTPMSections: (state, action) => {
            const { sections, id } = action.payload;
            (state.closeSectionPayload as ModuleEntities).tpmActivities[id].sections = sections;

        }
    },
    extraReducers: {
        [refreshSectionsList.type]: state => state
    }
});


export const {
    onCreateSectionSuccess,
    onGetSectionsSuccess,
    onFetchFromStorageSuccess,
    onResetCreatedSection,
    onSetLoading,
    onSuccessCloseSection,
    onSetMergedSection,
    onSetModuleEditingName,
    updateCloseSectionPayload,
    onCurrentActiveSection,
    onFetchForCloseSuccess,
    onThrowError,
    onUpdateTravelSection,
    onChangeInterventionSection,
    onUpdateActionPointSection,
    onUpdateTPMSections,
    onUpdateInterventionIndicatorsState
} = storeSlice.actions;

export const { reducer: rootReducer } = storeSlice;
