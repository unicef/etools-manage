import { createSlice, createAction } from 'redux-starter-kit';
import { SectionEntity, NewSectionFromMerged, CloseSectionPayload, ZippedEntityResults } from 'entities/types';

export interface Store {
    sections: SectionEntity[];
    createdSection: SectionEntity | null;
    mergedSection: NewSectionFromMerged | null;
    error: string | null;
    loading: boolean;
    closeSectionPayload: CloseSectionPayload | null;
    moduleEditingName: keyof ZippedEntityResults | null;
}

export const initialState: Store = {
    sections: [],
    createdSection: null,
    mergedSection: null,
    error: null,
    loading: false,
    closeSectionPayload: null,
    moduleEditingName: null
};

// Temporary due to ts compiler erroring on passing null as payload
export const onSetModuleEditingName = createAction('setModuleEdit');

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
        onModuleEntitiesDataSuccess: (state, action) => {
            state.closeSectionPayload = action.payload;
            state.loading = false;
        }
        // onSetModuleEditingName: (state, action) => {
        //     state.moduleEditingName = action.payload;
        // }
    },
    extraReducers: {
        [onSetModuleEditingName.type]: (state, action) => {
            state.moduleEditingName = action.payload;
        }
    }
});


export const {
    onCreateSectionSuccess,
    onGetSectionsSuccess,
    onModuleEntitiesDataSuccess,
    onResetCreatedSection,
    onSetLoading,
    onSetMergedSection,
    // onSetModuleEditingName,
    onThrowError
} = storeSlice.actions;

export const { reducer: rootReducer } = storeSlice;
