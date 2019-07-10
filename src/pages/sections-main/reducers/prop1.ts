import { createReducer } from 'redux-starter-kit';
import { increment, decrement, multiply } from '../actions';

const prop1Reducer = createReducer(
    1,
    {
        [increment.type]: (state, action) => state + action.payload,
        [decrement.type]: (state, action) => state + action.payload,
        [multiply.type]: (state: number, action) => {
            // should really put most logic in reducers
            return (state * 2 + action.payload) * 4;
        }
    }
);

export default prop1Reducer;
