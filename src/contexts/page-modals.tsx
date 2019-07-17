import React, { useContext, useReducer } from 'react';
import { onToggleAddModal, onToggleSplitModal, onToggleMergeModal } from 'actions';
import { modalsReducer } from 'reducers/modals';
import { ChildrenProps } from 'global-types';
import { PayloadAction } from 'redux-starter-kit';

// TODO: Clean this file up ie seperate types into own files
interface State {
    addModalOpen: boolean;
    splitModalOpen: boolean;
    mergeModalOpen: boolean;
    selectedForMerge: number[];
}

type ModalAction =
    typeof onToggleAddModal |
    typeof onToggleSplitModal |
    typeof onToggleMergeModal | PayloadAction

type Dispatch = (action: ModalAction) => void


const ModalsStateContext = React.createContext<State | undefined>(undefined);
const ModalsDispatchContext = React.createContext<Dispatch | undefined>(undefined);

export const initialStateModals: State = {
    addModalOpen: false,
    splitModalOpen: false,
    mergeModalOpen: false,
    selectedForMerge: []
};


export function PageModalsProvider({ children }: ChildrenProps) {
    const [state, setModalsState] = useReducer(modalsReducer, initialStateModals);
    return (
        <ModalsStateContext.Provider value={state}>
            <ModalsDispatchContext.Provider value={setModalsState}>
                {children}
            </ModalsDispatchContext.Provider>
        </ModalsStateContext.Provider>
    );
}


export function useModalsState() {

    const context = useContext(ModalsStateContext);
    if (context === undefined) {
        throw new Error('useModalsState must be used within a PageModalsProvider');
    }
    return context;
}

export function useModalsDispatch() {
    const context = useContext(ModalsDispatchContext);
    if (context === undefined) {
        throw new Error('useModalsDispatch must be used within a PageModalsProvider');
    }

    return context;
}


export const Modals: React.FC<ChildrenProps> = ({ children }) => (
    <PageModalsProvider>
        {children}
    </PageModalsProvider>
);

