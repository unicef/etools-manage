import prop1Reducer from './reducers/prop1';
import prop2Reducer from './reducers/prop2';
import { PAGE_ONE_NAMESPACE } from '../../global-constants';

export default () => ({
    name: PAGE_ONE_NAMESPACE,
    reducer: {
        prop1: prop1Reducer,
        prop2: prop2Reducer
    }
});
