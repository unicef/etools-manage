import { takeLatest, select, put } from 'redux-saga/effects';
import { createAction } from 'redux-starter-kit';

const onBack = createAction('ON_BACK');

export default function * () {
    yield takeLatest(onBack.type, handleBack);
}

export function * handleBack() {
    const { location } = yield select();

    yield put({
        type: location.prev.type,
        payload: location.prev.payload
    });
}
