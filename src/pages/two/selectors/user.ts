import { createSelector } from 'reselect';
import { PAGE_TWO_NAMESPACE } from 'global-constants';
import { getStateAtNamespaceKey } from 'utils/helpers';

// Here is where we can do type safety checks

// const selectPageTwo = state => getStateAtNamespaceKey(PAGE_TWO_NAMESPACE)(state);
const selectPageTwo = state => state[PAGE_TWO_NAMESPACE];

export const selectUserData = createSelector(
    selectPageTwo,
    pageTwo => pageTwo.userData
);

export const selectUserRepos = createSelector(
    selectPageTwo,
    pageTwo => pageTwo.userRepos
);


// export const selectUserData = selectPageTwo.userData;
// export const selectUserRepos = selectPageTwo.userRepos;

