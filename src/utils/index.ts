import { createReducer } from 'redux-starter-kit';

// caller is always useReducer which provides default value
export function makeReducer(reducer, initialState = null) {
    return createReducer(initialState, reducer);
}

export const valueFromEvent = setter => ({ target: { value } }) => setter(value);
