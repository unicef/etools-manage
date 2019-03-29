import { hot } from 'react-hot-loader/root';
import React from 'react';
import AppProviders from './components/app-providers';
import PageLoader from './containers/page-loader';
import { AppStore } from 'types';

/* eslint-disable */
const App = ({ store }: {store: AppStore}) => (
    <AppProviders store={store}>
        <PageLoader />
    </AppProviders>

);
(async () => {
    console.log('You have async support if you read this instead of "ReferenceError: regeneratorRuntime is not defined" error.');
})();

export default hot(App);
