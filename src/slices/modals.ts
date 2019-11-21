import { createSlice } from '@reduxjs/toolkit';

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
    name: 'modals',
    initialState: initialStateModals,
    reducers: {
        onToggleAddModal: state => {
            state.addModalOpen = !state.addModalOpen;
        },
        onToggleSplitModal: state => {
            state.splitModalOpen = !state.splitModalOpen;
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
    onToggleSplitModal
} = modalsSlice.actions;

export const { reducer: modalsReducer } = modalsSlice;
