import { createReducer } from 'redux-starter-kit';
import { items } from '../actions';


const prop2Reducer = createReducer(
    ['item1', 'item2', 'item3'],
    {
        [items.type]: (state, action) => action.payload
    }
);

export default prop2Reducer;
