import { takeLatest, all, put, call, AllEffect, Effect } from 'redux-saga/effects';
import {
    ON_LOGOUT,
    ON_LOGOUT_SUCCESS,
    REFRESH_AUTH_STATE
} from '../action-types';


export default function * (): AllEffect {
    yield all([
        takeLatest(ON_LOGOUT, handleLogout),
        takeLatest(REFRESH_AUTH_STATE, handleRefreshAuthState)
    ]);
}

export function * handleRefreshAuthState(): void {

}


export function * handleLogout(): Effect {
    yield call();
    yield put({ type: ON_LOGOUT_SUCCESS });
}
