import { createReducer } from 'redux-starter-kit';
import { onSetUserRepos } from '../actions';


const userReposReducer = createReducer(
    [],
    {
        [onSetUserRepos.type]: (state, action) => action.payload
    }
);

export default userReposReducer;
