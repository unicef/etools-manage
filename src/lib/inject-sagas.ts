import { noop } from 'micro-dash';

export default (store, rootSaga, { uid } = { uid: null }) => {
    if (uid) {
        if (store.runningSagas[uid]) {
            return noop;
        }

        store.runningSagas[uid] = true;
    }

    store.runSaga(rootSaga)
        .toPromise()
        .catch(err => {
            // use bug reporter here in production and dispatch error action inside saga if try/catch fails
            throw new Error(err);
        });

    if (uid) {
        return () => {
            store.runningSagas[uid] = null;
        };
    }

    return noop;
};
