import { compose, Middleware, MiddlewareAPI, Action, Dispatch } from 'redux';

const middlewares = [];

const dynamicMiddleware: Middleware = (store): MiddlewareAPI => (next: Dispatch) => (action: Action): Middleware => {
    const middlewareAPI = {
        dispatch: (...args) => store.dispatch(...args),
        getState: () => store.getState()
    };

    const chain = middlewares.map(middleware => middleware(middlewareAPI));

    return compose(...chain)(next)(action);
};

const addMiddleware = (middleware: Middleware): (() => any[]) => {
    middlewares.push(middleware);

    return () => {
        const index = middlewares.indexOf(middleware);

        middlewares.splice(index, 1);
    };
};

const resetMiddlewares = (): any[] => middlewares.splice(0, middlewares.length);

export {
    dynamicMiddleware,
    addMiddleware,
    resetMiddlewares
};
