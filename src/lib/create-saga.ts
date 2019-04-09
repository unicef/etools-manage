import arrify from 'arrify';
import { cloneDeep } from 'micro-dash';
import { all, fork, take, Effect } from 'redux-saga/effects';
import { onRouteTransition } from '../actions';

//@ts-ignore
export function* createSaga(sagas: Effect<any>, ...args) {
    
    // @ts-ignore
    const runningSagas = yield all(arrify(sagas).map(saga => fork(saga, ...args)));//@ts-ignore

    yield take(onRouteTransition.type);
    runningSagas.forEach(saga => saga.cancel());
}
//@ts-ignore
export function* createAsyncPageSaga(sagas, ...args) {
    // Must be while(true) since these are only injected once on initial page load.
    // When navigating away and back to a page, we need to recreate the sagas for
    // proper initialization.
    while (true) {
        yield createSaga(sagas, ...cloneDeep(args));
    }
}
