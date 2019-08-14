import { createSelector } from 'redux-starter-kit';


export const selectUserProfile = createSelector(
    ['user']
);
