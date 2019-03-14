import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
// import dispatchFromQueryString from './dispatch-from-query-string';
// import { createApolloFetchClient } from './create-apollo-fetch';
import { dynamicMiddleware } from './redux-dynamic-middleware';
import thunkMiddleware from './thunk-middleware';
// import authHydrater from './auth-hydrater-next';
// import injectReducers from './inject-reducers';
// import createRouter from './create-router';
// import eventsMiddleware from './events';
// import createReducer from './reducer';


export default () => {
    const router = createRouter();
    const sagas = createSagaMiddleware();

    const middleware = [
        thunkMiddleware,
        sagas,
        router.middleware,
        // authMiddleware,
        // eventsMiddleware,
        dynamicMiddleware
    ];

    let composeEnhancers = compose;

    if (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }

    const reducer = createReducer({
        location: router.reducer
    });

    const initialState = {};

    const rootStore = createStore(reducer, initialState, composeEnhancers(
        router.enhancer,
        applyMiddleware(...middleware)
    ));

    // Run the saga that is used across the app
    sagas.run(rootSaga);

    const store = {
        ...rootStore,
        // Give the store a run method to run async sagas
        runSaga: sagas.run,
        // Keep track of injected reducers
        injectReducers,
        // Keep track of all async loaded reducers
        asyncReducers: {
            location: router.reducer
        },
        // Keep track of all running sagas
        runningSagas: {},
        // Store the history object in store
        history: router.history
    };

    // We want to bind the apollo fetch client with the
    // redux store in order to access tokens.
    createApolloFetchClient(rootStore);
    dispatchFromQueryString(store);

    // KEEP THIS LAST, THIS IS IMPORTANT
    authHydrater(rootStore);

    return store;
};
