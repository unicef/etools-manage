import { takeLatest, put, call } from 'redux-saga/effects';
import { onInitFetch, onSetUserData, onSetUserRepos } from '../actions';
import { fetchUserData, fetchUserRepos } from '../lib/fetch-user-data';


export default function * () {
    yield takeLatest(onInitFetch.type, handleInit);
}

export function * handleInit() {
    const user = 'marko911';
    try {
        const userData = yield call(fetchUserData, user);
        yield put(onSetUserData(userData));

        const userRepos = yield call(fetchUserRepos, user);
        yield put(onSetUserRepos(userRepos));

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            throw new Error(`Failed fetching github user data for user: ${user}`);
        }
        // else {
        //     // add real error logging / handling
        // }
    }


}
