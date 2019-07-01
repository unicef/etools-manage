import { makeReducer } from 'utils';
import { onToggleAddModal, onToggleSplitModal } from 'actions';


export const modalsReducer = makeReducer({
    [onToggleAddModal.type]: state => {
        state.addModalOpen = !state.addModalOpen;
    },
    [onToggleSplitModal.type]: state => {
        state.splitModalOpen = !state.splitModalOpen;
    }
});


