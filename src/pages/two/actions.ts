import { createAction } from 'redux-starter-kit';

export const items = createAction('ITEMS');
export const onInitFetch = createAction('ON_INIT_FETCH');
export const onSetUserData = createAction('ON_SET_USER_DATA');
export const onSetUserRepos = createAction('ON_SET_USER_REPOS');
