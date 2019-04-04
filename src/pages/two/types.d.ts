import userReposReducer from './reducers/user-repos';
import userDataReducer from './reducers/user-data';

export interface PageTwoProps {
    userData: object;
    userRepos: any[];
}

export interface PageTwoNamespaceShape {
    userRepos: ReturnType<typeof userReposReducer>;
    userData: ReturnType<typeof userDataReducer>;
}
