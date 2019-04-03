import { hot } from 'react-hot-loader';
export { default as reducer } from './reducer';
export { default as rootSaga } from './sagas';
import Page from './containers/page';
export default hot(module)(Page);
