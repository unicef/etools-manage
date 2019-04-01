import prop1Reducer from './reducers/prop1';
import prop2Reducer from './reducers/prop2';

export interface PageTwoProps {
    hasBack: boolean;
    prop2: any[];
}

export interface PageTwoNamespaceShape {
    prop1: ReturnType<typeof prop1Reducer>;
    prop2: ReturnType<typeof prop2Reducer>;
}
