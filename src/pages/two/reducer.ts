import userDataReducer from './reducers/user-data';
import userReposReducer from './reducers/user-repos';


export default () => ({
    name: 'pageTwo',
    reducer: {
        userData: userDataReducer,
        userRepos: userReposReducer
    }
});
