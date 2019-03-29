import prop1Reducer from './reducers/prop1';
import prop2Reducer from './reducers/prop2';


export default () => ({
    name: 'pageOne',
    reducer: {
        prop1: prop1Reducer,
        prop2: prop2Reducer
    }
});
