
import { createSlice } from 'redux-starter-kit';

export interface ModalsState {
    addModalOpen: boolean;
    splitModalOpen: boolean;
    mergeModalOpen: boolean;
    selectedForMerge: number[];
}

export const initialStateModals: ModalsState = {
    addModalOpen: false,
    splitModalOpen: false,
    mergeModalOpen: false,
    selectedForMerge: []
};

const modalsSlice = createSlice({
    slice: 'modals',
    initialState: initialStateModals,
    reducers: {
        onToggleAddModal: state => {
            state.addModalOpen = !state.addModalOpen;
        },
        splitModalActive: (state, action) => {
            state.splitModalOpen = action.payload;
        },
        onToggleMergeModal: state => {
            state.mergeModalOpen = !state.mergeModalOpen;
        },
        onSelectForMerge: (state, action) => {
            state.selectedForMerge = action.payload;
        }
    }
});

export const {
    onSelectForMerge,
    onToggleAddModal,
    onToggleMergeModal,
    splitModalActive
} = modalsSlice.actions;

export const { reducer: modalsReducer } = modalsSlice;
