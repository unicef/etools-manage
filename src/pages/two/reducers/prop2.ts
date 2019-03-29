import { createReducer } from 'redux-starter-kit';
import { items } from '../actions';


const prop2Reducer = createReducer(
    [],
    {
        [items.toString()]: (state, action) => action.payload
    }
);

export default prop2Reducer;
