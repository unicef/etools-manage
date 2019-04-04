import { hot } from 'react-hot-loader';
import Page from './containers/page';

export { default as reducer } from './reducer';
export { default as rootSaga } from './sagas';
export default process.env.NODE_ENV === 'development' ? hot(module)(Page) : Page;

