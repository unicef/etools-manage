import { takeLatest, select, put } from 'redux-saga/effects';
import { onBack } from '../actions';

export default function * () {
    yield takeLatest(onBack.toString(), handleBack);
}

export function * handleBack() {
    const { location } = yield select();

    yield put({
        type: location.prev.type,
        payload: location.prev.payload
    });
}
