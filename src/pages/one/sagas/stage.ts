import { takeLatest, select, put } from 'redux-saga/effects';
import { onBack } from '../actions';

export default function * () {
    yield takeLatest(onBack.type, handleBack);
}

export function * handleBack() {
    // sample saga for going back to previous page via router
    const { location } = yield select();

    yield put({
        type: location.prev.type,
        payload: location.prev.payload
    });
}
