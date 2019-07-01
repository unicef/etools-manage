import React, { useContext, useReducer } from 'react';
import PageModals from 'components/page-modals';
import { onToggleAddModal, onToggleSplitModal } from 'actions';
import { modalsReducer } from 'reducers/modals';
import { ProviderProps } from 'global-types';

// TODO: Clean this file up
interface State {
    addModalOpen: boolean;
    splitModalOpen: boolean;
}


type ModalAction = typeof onToggleAddModal | typeof onToggleSplitModal

type Dispatch = (action: ModalAction) => void


const ModalsStateContext = React.createContext<State | undefined>(undefined);
const ModalsDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const initialState: State = {
    addModalOpen: false,
    splitModalOpen: false
};


export function PageModalsProvider({ children }: ProviderProps) {
    const [state, setModalsState] = useReducer(modalsReducer, initialState);
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
        throw new Error('useCountDispatch must be used within a PageModalsProvider');
    }

    return context;
}

export function Modals({ children }) {
    return (
        <PageModalsProvider>
            <PageModals />
            {children}
        </PageModalsProvider>
    );
}
