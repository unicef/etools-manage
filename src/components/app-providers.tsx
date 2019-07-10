import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import ErrorBoundary from 'react-error-boundary';
import { ProviderStore } from 'global-types';
import UserProvider from '../contexts/user';
import { AppStoreProvider } from 'contexts/app';
import { LoadingProvider } from 'contexts/loading';
import theme from '../lib/theme';

interface FallbackProps {
    error?: Error;
    message?: string;
}


function CustomFallbackComponent({ error, message }: FallbackProps) {
    return (
        <div>
            {`An error was thrown: "${error}". ${message}`}
        </div>
    );
}

const AppProviders: React.FC<ProviderStore> = ({ children }) => {
    console.log(theme);
    return (
        <ErrorBoundary FallbackComponent={CustomFallbackComponent}>
            <ThemeProvider theme={theme}>
                <LoadingProvider>
                    <UserProvider >
                        <AppStoreProvider >
                        <>{children}</>
                        </AppStoreProvider>
                    </UserProvider>
                </LoadingProvider>
            </ThemeProvider>
        </ErrorBoundary>);
};

export default AppProviders;

