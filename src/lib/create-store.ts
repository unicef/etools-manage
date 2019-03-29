import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import rootSaga from '../sagas';
import dispatchFromQueryString from './dispatch-from-query-string';
// import { dynamicMiddleware } from './redux-dynamic-middleware';
import thunkMiddleware from './thunk-middleware';
import injectReducers from './inject-reducers';
import createRouter from './create-router';
// import eventsMiddleware from './events';
import createReducer from './reducer';


export default () => {
    const router = createRouter();
    const sagas = createSagaMiddleware();

    const middleware = [
        thunkMiddleware,
        sagas,
        router.middleware
        // eventsMiddleware,
        // dynamicMiddleware
    ];

    let composeEnhancers = compose;

    if (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
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
    // sagas.run(rootSaga);

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

    dispatchFromQueryString(store);

    return store;
};
