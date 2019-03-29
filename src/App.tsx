import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import AppProviders from './components/app-providers';
// import Counter from './Counter';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { AppState } from 'lib/reducer';

const App = ({ store }: Store<AppState>) => (
    <AppProviders store={store}>
        {/* <PageLoader /> */}
        <div />
    </AppProviders>

);
(async () => {
    console.log('You have async support if you read this instead of "ReferenceError: regeneratorRuntime is not defined" error.');
})();

export default hot(App);
