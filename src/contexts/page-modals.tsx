import React, { useContext, useReducer } from 'react';
import { ChildrenProps, ContextDispatch } from 'global-types';
import { ModalsState, initialStateModals, modalsReducer } from 'slices/modals';

const ModalsStateContext = React.createContext<ModalsState | undefined>(undefined);
const ModalsDispatchContext = React.createContext<ContextDispatch | undefined>(undefined);

export function PageModalsProvider({ children }: ChildrenProps): JSX.Element {
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
    <PageModalsProvider>{children}</PageModalsProvider>
);
