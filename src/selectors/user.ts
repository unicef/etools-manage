import { createSelector } from 'reselect';
import { FullStoreShape } from 'contexts/app';
import { UserProfile } from 'global-types';

export const selectUserProfile: (state: FullStoreShape) => UserProfile | null = state => state.user;

export const selectCountryName = createSelector(
    [selectUserProfile],
    user => (user && user.country.name) || ''
);
