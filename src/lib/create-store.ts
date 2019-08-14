import { configureStore } from 'redux-starter-kit';
import logger from 'redux-logger';
import { errorMiddleware } from './error-middleware';
import storageMiddleware from './storage-middleware';
import fetchLatestSectionsMiddleware from './latest-sections-middleware';
import reducer from 'reducers';
import { filterCurrentSectionMiddleware } from './filter-current-section-middleware';

const middleware = [
    fetchLatestSectionsMiddleware,
    filterCurrentSectionMiddleware,
    storageMiddleware,
    errorMiddleware,
    logger
];


export default function configureAppStore() {

    const store = configureStore({
        reducer,
        middleware,
        devTools: process.env.NODE_ENV !== 'production'
    });

    // @ts-ignore
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        // @ts-ignore
        module.hot.accept('reducers', () => store.replaceReducer(reducer));
    }
    return store;
}

