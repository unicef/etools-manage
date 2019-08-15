import { createSelector } from 'redux-starter-kit';


export const selectUserProfile = createSelector(
    ['user']
);

export const selectCountryName = createSelector(
    ['user.country.name']
)
