import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
// import CustomContextProvider from './context-provider';
import MatchMediaProvider from './match-media-provider';
import { AppState } from '../lib/reducer';

interface ProviderStore {
    state: AppState;
}

const AppProviders: React.FunctionComponent<{children: ReactNode; store: Store<AppState>}> = ({ children, store }) => {
    return (
        <Provider store={store}>
            <MatchMediaProvider>
                {children}
            </MatchMediaProvider>
        </Provider>
    );
};

export default AppProviders;
