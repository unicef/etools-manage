import { createAsyncPageSaga } from '../../lib/create-saga';
import stageSaga from './sagas/stage';

export default function * () {
    yield createAsyncPageSaga([
        stageSaga
        // add second saga here
    ]);
}
