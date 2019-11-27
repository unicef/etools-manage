import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import ErrorBoundary from 'react-error-boundary';
import { ProviderStore } from 'global-types';
import { AppStoreProvider } from 'contexts/app';
import theme from '../lib/theme';
import ErrorCard from './error-card';

const AppProviders: React.FC<ProviderStore> = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorCard}>
            <ThemeProvider theme={theme}>
                <AppStoreProvider>
                    <>{children}</>
                </AppStoreProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default AppProviders;
