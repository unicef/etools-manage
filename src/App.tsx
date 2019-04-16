
import React from 'react';
import AppProviders from './components/app-providers';
import PageLoader from './containers/page-loader';
import AppFrame from './containers/app-frame';
import { BaseStoreShape } from 'global-types';

const App = ({ store }: { store: BaseStoreShape }) => (
    <AppProviders store={store}>
        <AppFrame>
            <PageLoader />
        </AppFrame>
    </AppProviders>

);


export default App;

