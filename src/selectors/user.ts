import { createSelector } from 'reselect';
import { FullStoreShape } from 'contexts/app';
import { UserProfile } from 'global-types';

export const selectUserProfile: UserProfile | null = (state: FullStoreShape) => state.user;

export const selectCountryName = createSelector(
    [selectUserProfile],
    user => user.country.name
);
