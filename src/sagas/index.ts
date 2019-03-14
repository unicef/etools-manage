import { all, AllEffect } from 'redux-saga/effects';

import authSaga from './auth';

export default function * (): AllEffect {
    yield all([
        authSaga()
    ]);
}
