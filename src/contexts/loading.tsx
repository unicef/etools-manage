import React, { useContext, useReducer } from 'react';
import { onToggleLoading } from 'actions';
import { PayloadAction } from 'redux-starter-kit';
import { loadingReducer } from 'reducers/loading';
import { ChildrenProps } from 'global-types';


interface State {
    loading: boolean;
}

export type LoadingAction = typeof onToggleLoading | PayloadAction

type Dispatch = (action: LoadingAction) => void

const StateContext = React.createContext<State | undefined>(undefined);
const DispatchContext = React.createContext<Dispatch | undefined>(undefined);

const initialState: State = {
    loading: false
};

export function LoadingProvider({ children }: ChildrenProps) {
    const [loading, setLoading] = useReducer(loadingReducer, initialState);
    return (
        <StateContext.Provider value={loading}>
            <DispatchContext.Provider value={setLoading} >
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
}

export function useLoadingState() {
    const context = useContext(StateContext);
    if (context === undefined) {
        throw new Error('useLoadingState must be used within a Loading Provider');
    }
    return context;
}

export function useLoadingDispatch() {
    const context = useContext(DispatchContext);
    if (context === undefined) {
        throw new Error('useLoadingDispatch must be used within a Loading Provider');
    }
    return context;
}
