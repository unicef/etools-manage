import { createReducer } from 'react-use';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { composeWithDevTools } from 'redux-devtools-extension';


import { errorMiddleware } from './error-middleware';
import logger from 'redux-logger';
import { rootReducer, initialState, Store } from 'slices/root-store';


const middleware = [...getDefaultMiddleware(), errorMiddleware, logger];


// export const createStore = createReducer(errorMiddleware, logger);

export default function configureAppStore(preloadedState: Store) {

    const store = configureStore({
        reducer: rootReducer,
        middleware,
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState
    });
    // @ts-ignore
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        // @ts-ignore
        module.hot.accept('slices/root-store', () => store.replaceReducer(rootReducer));
    }
    return store;
}

