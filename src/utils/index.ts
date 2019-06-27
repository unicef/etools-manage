import { createReducer } from 'redux-starter-kit';

// caller is always useReducer which provides default value
export function makeReducer(reducer) {
    return createReducer(null, reducer);
}

