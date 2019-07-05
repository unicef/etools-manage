import { makeReducer } from 'utils';
import { onToggleAddModal, onToggleSplitModal, onToggleMergeModal } from 'actions';


export const modalsReducer = makeReducer({
    [onToggleAddModal.type]: state => {
        state.addModalOpen = !state.addModalOpen;
    },
    [onToggleSplitModal.type]: state => {
        state.splitModalOpen = !state.splitModalOpen;
    },
    [onToggleMergeModal.type]: state => {
        state.mergeModalOpen = !state.mergeModalOpen;
    }
});


