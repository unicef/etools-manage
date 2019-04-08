import React from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from 'react-error-boundary';
// import CustomContextProvider from './context-provider';
import MatchMediaProvider from './match-media-provider';
import UserProvider from '../contexts/user';
import { ProviderStore } from 'global-types';
import { ThemeProvider } from '@material-ui/styles';
import { defaultTheme as theme } from '../lib/theme';

function CustomFallbackComponent({ error, message }) {
    return (
        <div>
            {`An error was thrown: "${error}". ${message}`}
        </div>
    );
}


const AppProviders: React.FunctionComponent<ProviderStore> = ({ children, store }) => {
    return (
        <ThemeProvider theme={theme}>
            <ErrorBoundary FallbackComponent={CustomFallbackComponent}>
                <UserProvider username="marko911">
                    <Provider store={store}>
                        <MatchMediaProvider>
                            {children}
                        </MatchMediaProvider>
                    </Provider>
                </UserProvider>
            </ErrorBoundary>

        </ThemeProvider>


    );
};

export default AppProviders;
