import { configureStore } from 'redux-starter-kit';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import { errorMiddleware } from './error-middleware';
import { rootReducer, Store } from 'store/root-store';
import storageMiddleware from './storage-middleware';
import fetchLatestSectionsMiddleware from './latest-sections-middleware';
import { closeSectionPayloadReducer } from 'store/close-section-slice';


const middleware = [
    fetchLatestSectionsMiddleware,
    storageMiddleware,
    errorMiddleware,
    logger
];

const reducer = combineReducers({
    closeSectionPayload: closeSectionPayloadReducer,
    ...rootReducer
});

export default function configureAppStore() {

    const store = configureStore({
        reducer,
        middleware,
        devTools: process.env.NODE_ENV !== 'production'
    });

    // @ts-ignore
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        // @ts-ignore
        module.hot.accept('slices/root-store', () => store.replaceReducer(rootReducer));
    }
    return store;
}

