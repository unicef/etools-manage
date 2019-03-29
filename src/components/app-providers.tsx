import React from 'react';
import { Provider } from 'react-redux';
// import CustomContextProvider from './context-provider';
import MatchMediaProvider from './match-media-provider';
import { ProviderStore } from 'types';


/* eslint-disable */
const AppProviders: React.FunctionComponent<ProviderStore> = ({ children, store }) => {
    return (
        <Provider store={store}>
            <MatchMediaProvider>
                {children}
            </MatchMediaProvider>
        </Provider>
    );
};

export default AppProviders;
