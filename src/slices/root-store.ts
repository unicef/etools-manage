import { createSlice } from 'redux-starter-kit';
import { SectionEntity, NewSectionFromMerged, ModuleEntities } from 'entities/types';
import { selectWithoutCurrentSection } from 'selectors/filter-sections';

export interface Store {
    sections: SectionEntity[];
    createdSection: SectionEntity | null;
    mergedSection: NewSectionFromMerged | null;
    error: string | null;
    loading: boolean;
    closeSectionPayload: ModuleEntities | null;
    moduleEditingName: keyof ModuleEntities | null;
    currentActiveSection: number | null;
}

export const initialState: Store = {
    sections: [],
    createdSection: null,
    mergedSection: null,
    error: null,
    loading: false,
    closeSectionPayload: null,
    moduleEditingName: null,
    currentActiveSection: null
};

// TODO: split up reducers of closedSectionpayload
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
        onChangeInterventionSection: (state, action) => {
            const { idx, sections } = action.payload;
            if (state.closeSectionPayload) {
                state.closeSectionPayload.interventions[idx].sections = sections;
            } else {
                return state;
            }
        }
    }
});


export const {
    onCreateSectionSuccess,
    onGetSectionsSuccess,
    onFetchFromStorageSuccess,
    onResetCreatedSection,
    onSetLoading,
    onSetMergedSection,
    onSetModuleEditingName,
    updateCloseSectionPayload,
    onCurrentActiveSection,
    onFetchForCloseSuccess,
    onThrowError,
    onChangeInterventionSection

} = storeSlice.actions;

export const { reducer: rootReducer } = storeSlice;
