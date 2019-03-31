import React from 'react';
import AppProviders from './components/app-providers';
import PageLoader from './containers/page-loader';
import { StoreShape } from 'types';
import { hot } from 'react-hot-loader/root';

/* eslint-disable */
const App = ({ store }: {store: StoreShape}) => (
    <AppProviders store={store}>
        <PageLoader />
    </AppProviders>

);
(async () => {
    console.log('You have async support if you read this instead of "ReferenceError: regeneratorRuntime is not defined" error.');
})();

export default hot(App);
