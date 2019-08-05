import { configureStore } from 'redux-starter-kit';


import { errorMiddleware } from './error-middleware';
import logger from 'redux-logger';
import { rootReducer, Store } from 'slices/root-store';
import storageMiddleware from './storage-middleware';


const middleware = [

    storageMiddleware,
    errorMiddleware,
    logger
];

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

