import { createReducer } from 'redux-starter-kit';
import { onSetUserData } from '../actions';


const userDataReducer = createReducer(
    [],
    {
        [onSetUserData.type]: (state, action) => action.payload
    }
);

export default userDataReducer;
