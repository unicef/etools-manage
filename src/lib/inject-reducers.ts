import createReducer from './reducer';

export default (store, { name, reducer }) => {
    if (!reducer || store.asyncReducers[name]) {
        return;
    }
    // Add the new reducers by name to the main list of reducers
    store.asyncReducers[name] = reducer;
    // Create a new reducer with all the async reducers
    const newReducer = createReducer(store.asyncReducers);
    store.replaceReducer(newReducer);
};
