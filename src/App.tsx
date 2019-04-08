import React from 'react';
import AppProviders from './components/app-providers';
// import PageLoader from './containers/page-loader';
import { hot } from 'react-hot-loader/root';
import { BaseStoreShape } from 'global-types';
// import { Typography } from '@material-ui/core';
/* eslint-disable */
const App = ({ store }: { store: BaseStoreShape }) => (
    <AppProviders store={store}>
        <h3>Marko</h3>
    </AppProviders>

);
(async () => {
    console.log('You have async support if you read this instead of "ReferenceError: regeneratorRuntime is not defined" error.');
})();

export default hot(App);

//    {/* <AppFrame> */}
//    <PageLoader />
//    {/* <Typography variant="h3">Check this out</Typography> */}
// {/* </AppFrame> */}
