
import React from 'react';
import AppProviders from './components/app-providers';
import AppFrame from './components/app-frame';
import Page from 'pages/one';

const App = () => (
    <AppProviders >
        <AppFrame>
            <Page/>
        </AppFrame>
    </AppProviders>

);


export default App;

