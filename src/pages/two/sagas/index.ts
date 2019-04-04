import { createAsyncPageSaga } from '../../../lib/create-saga';
import initialize from './initialize';

export default function * () {
    yield createAsyncPageSaga([
        initialize
        // add other sagas here ie. handle save data / updates
    ]);
}
