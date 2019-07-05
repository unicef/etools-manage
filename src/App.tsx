
import React from 'react';
import { hot } from 'react-hot-loader';
import AppProviders from './components/app-providers';
import AppFrame from './components/app-frame';
import AppRouter from 'components/router';

const App = () => (
    <AppProviders>
        <AppFrame>
            <AppRouter />
        </AppFrame>
    </AppProviders>

);


export default hot(module)(App);

