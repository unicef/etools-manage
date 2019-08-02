import { createReducer } from 'react-use';
import { errorMiddleware } from './error-middleware';
import logger from 'redux-logger';


export const createStore = createReducer(errorMiddleware, logger);
