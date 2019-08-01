import { errorMiddleware } from './error-middleware';
import { Store } from 'slices/root-store';
import { Dispatch, DispatchAction } from 'global-types';

export type AppMiddleware = ({ getState }: {
    getState: () => Store;
}) => (dispatch: Dispatch) => (action: DispatchAction) => void

export const middlewares: AppMiddleware[] = [
    errorMiddleware
];
