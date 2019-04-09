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
            throw new Error(err);
        });

    if (uid) {
        return () => {
            store.runningSagas[uid] = null;
        };
    }

    return noop;
};
