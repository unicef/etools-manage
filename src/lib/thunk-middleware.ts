export default store => next => action => {
    if (typeof action === 'function') {
        console.log('FUNC');
        return action(store.dispatch, store.getState, store);
    }
    console.log('ACTION', action);
    console.log('NEXT', next);

    return next(action);
};
