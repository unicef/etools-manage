import { runSaga } from 'redux-saga';

import { onSetUserData, onSetUserRepos } from '../actions';
import { handleInit } from '../sagas/initialize';

// mocked functions are in __mocks__ dir adjacent to lib being mocked
jest.mock('../lib/fetch-user-data');

describe('Page One Sagas', () => {

    test('dispatches user data and user repos on successful request', async () => {
        const dispatched = [];
        await runSaga(
            {
                dispatch: action => dispatched.push(action)
            },
            handleInit
        ).toPromise();

        expect(dispatched).toEqual([
            { type: onSetUserData.type, payload: {
                id: 1,
                name: 'Billy Bobcat',
                bio: 'Web developer'
            } },
            { type: onSetUserRepos.type, payload: ['test repo 1', 'test repo 2'] }
        ]);
    });


});
