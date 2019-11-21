import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { errorMiddleware } from './error-middleware';
import storageMiddleware from './storage-middleware';
import fetchLatestSectionsMiddleware from './latest-sections-middleware';
import reducer from 'slices';
import { filterCurrentSectionMiddleware } from './filter-current-section-middleware';
import { authMiddleware } from './auth-middleware';

const middleware = [
    fetchLatestSectionsMiddleware,
    filterCurrentSectionMiddleware,
    storageMiddleware,
    errorMiddleware,
    authMiddleware,
    thunk
];

if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middleware.push(logger);
}

export default function configureAppStore() {
    const store = configureStore({
        reducer,
        middleware,
        devTools: true
    });

    // @ts-ignore
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        // @ts-ignore
        module.hot.accept('slices', () => store.replaceReducer(reducer));
    }
    return store;
}
