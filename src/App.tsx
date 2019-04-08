import React from 'react';
import AppProviders from './components/app-providers';
import PageLoader from './containers/page-loader';
import AppFrame from './containers/app-frame';
import { hot } from 'react-hot-loader/root';
import { BaseStoreShape } from 'global-types';

/* eslint-disable */
const App = ({ store }: { store: BaseStoreShape }) => (
    <AppProviders store={store}>
        <AppFrame>
            <PageLoader />
        </AppFrame>
    </AppProviders>

);
(async () => {
    console.log('You have async support if you read this instead of "ReferenceError: regeneratorRuntime is not defined" error.');
})();

export default hot(App);

