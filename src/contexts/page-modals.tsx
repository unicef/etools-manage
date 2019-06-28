import React, { useContext, useReducer } from 'react';
import { createAction } from 'redux-starter-kit';
import { makeReducer } from 'utils';
import PageModals from 'components/page-modals';
interface State {
    addModalOpen: boolean;
    splitModalOpen: boolean;
}

export const onToggleAddModal = createAction('modals/toggleAdd');
export const onToggleSplitModal = createAction('modals/toggleSplit');

type ModalAction = typeof onToggleAddModal | typeof onToggleSplitModal

type Dispatch = (action: ModalAction) => void
interface PageModalsProviderProps {
    children: React.ReactNode;
}
const ModalsStateContext = React.createContext<State | undefined>(undefined);
const ModalsDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const initialState: State = {
    addModalOpen: false,
    splitModalOpen: false
};

const modalsReducer = makeReducer({
    [onToggleAddModal.type]: state => {
        state.addModalOpen = !state.addModalOpen;
    },
    [onToggleSplitModal.type]: state => {
        state.splitModalOpen = !state.splitModalOpen;
    }
});

export function PageModalsProvider({ children }: PageModalsProviderProps) {
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
