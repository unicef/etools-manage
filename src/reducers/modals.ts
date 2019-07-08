import { makeReducer } from 'utils';
import {
    onToggleAddModal,
    onToggleSplitModal,
    onToggleMergeModal,
    onSelectForMerge } from 'actions';


export const modalsReducer = makeReducer({
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


