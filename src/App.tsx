import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import AppProviders from './components/app-providers';
import Counter from './Counter';
import { Store } from 'redux';
import { AppState } from 'lib/reducer';

const App = ({ store }: {store: Store<AppState>}) => (
    <AppProviders store={store}>
        {/* <PageLoader /> */}
        <Counter />
    </AppProviders>

);
(async () => {
    console.log('You have async support if you read this instead of "ReferenceError: regeneratorRuntime is not defined" error.');
})();

export default hot(App);
