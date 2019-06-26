import React from 'react';
import ErrorBoundary from 'react-error-boundary';
// import CustomContextProvider from './context-provider';
import UserProvider from '../contexts/user';
import { ProviderStore } from 'global-types';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../lib/theme';

function CustomFallbackComponent({ error, message }) {
    return (
        <div>
            {`An error was thrown: "${error}". ${message}`}
        </div>
    );
}


const AppProviders: React.FunctionComponent<ProviderStore> = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={CustomFallbackComponent}>
            <ThemeProvider theme={theme}>
                <UserProvider username="marko911">
                    {children}
                </UserProvider>
            </ThemeProvider>
        </ErrorBoundary>


    );
};

export default AppProviders;
