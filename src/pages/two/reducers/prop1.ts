import { createReducer } from 'redux-starter-kit';
import { increment, decrement, multiply } from '../actions';

const prop1Reducer = createReducer(
    1,
    {
        [increment.toString()]: (state, action) => state + action.payload,
        [decrement.toString()]: (state, action) => state + action.payload,
        [multiply.toString()]: (state: number, action) => {
            // should really put most logic in reducers
            return (state * 2 + action.payload) * 4;
        }
    }
);

export default prop1Reducer;
