import { useState } from 'react';
import { compose } from 'ramda';
import { rootReducer, Store } from 'slices/root-store';
import { DispatchAction, Dispatch } from 'global-types';
import { AppMiddleware } from './middlewares';


function useEnhancedReducer(reducer: typeof rootReducer, initialState: Store, middlewares: AppMiddleware[]): [Store, Dispatch] {
    const hook = useState(initialState);
    let state = hook[0];
    const setState = hook[1];
    const dispatch = (action: DispatchAction) => {
        state = reducer(state, action);
        setState(state);
        return action;
    };

    const store = {
        getState: () => state,
        dispatch: (action: DispatchAction) => enhancedDispatch(action)
    };

    const chain = middlewares.map(middleware => middleware(store));
    const enhancedDispatch: Dispatch = compose(...chain)(dispatch);
    return [state, enhancedDispatch];
}

export default useEnhancedReducer;
