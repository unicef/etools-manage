import { compose, Middleware } from 'redux';

const middlewares = [];

// const dynamicMiddleware = store => next => (action: Action) => {
//     const middlewareAPI = {
//         dispatch: (...args) => store.dispatch(...args),
//         getState: () => store.getState()
//     };

//     const chain = middlewares.map(middleware => middleware(middlewareAPI));

//     return compose<StoreEnhancerStoreCreator<any>>(...chain)(next)(action);
// };

const addMiddleware = (middleware: Middleware): (() => void) => {
    middlewares.push(middleware);

    return () => {
        const index = middlewares.indexOf(middleware);

        middlewares.splice(index, 1);
    };
};

const resetMiddlewares = (): any[] => middlewares.splice(0, middlewares.length);

export {
    // dynamicMiddleware,
    addMiddleware,
    resetMiddlewares
};
