import {
    onToggleAddModal,
    onToggleSplitModal,
    onToggleMergeModal,
    onSelectForMerge } from 'actions';
import { initialStateModals } from 'contexts/page-modals';
import { createReducer } from 'redux-starter-kit';

export const checker = () => console.log('WHAT THE FUCK ');

export const modalsReducer = createReducer(initialStateModals, {
    [onToggleAddModal.type]: state => {
        state.addModalOpen = !state.addModalOpen;
    },
    [onToggleSplitModal.type]: state => {
        state.splitModalOpen = !state.splitModalOpen;
    },
    [onToggleMergeModal.type]: state => {
        state.mergeModalOpen = !state.mergeModalOpen;
    },
    [onSelectForMerge.type]: (state, action) => {
        state.selectedForMerge = action.payload;
    }
});


