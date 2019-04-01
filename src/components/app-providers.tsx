import React from 'react';
import { Provider } from 'react-redux';
// import CustomContextProvider from './context-provider';
import MatchMediaProvider from './match-media-provider';
import { ProviderStore } from 'global-types';
import { ThemeProvider } from '@material-ui/styles';
import { defaultTheme as theme, defaultTheme } from '../lib/theme';

const AppProviders: React.FunctionComponent<ProviderStore> = ({ children, store }) => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}
            >
                <MatchMediaProvider>
                    {children}
                </MatchMediaProvider>
            </ThemeProvider>
        </Provider>
    );
};

export default AppProviders;
