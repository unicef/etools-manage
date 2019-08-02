import { AppMiddleware } from './middlewares';


export const errorMiddleware: AppMiddleware = ({ getState }) => dispatch => action => {
    const state = getState();

    if (state.error) {
        return;
    }

    dispatch(action);
};

