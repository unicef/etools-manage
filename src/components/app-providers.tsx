import React from 'react';
import ErrorBoundary from 'react-error-boundary';

// import CustomContextProvider from './context-provider';
import UserProvider from '../contexts/user';
import { ProviderStore } from 'global-types';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../lib/theme';
import withUserProvider from 'hocs/withUserProvider';
import withErrorBoundary from 'hocs/withErrorBoundary';
import withThemeProvider from 'hocs/withThemeProvider';

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
                <UserProvider username="marko911">
                    <>{children}</>
                </UserProvider>
            </ThemeProvider>
        </ErrorBoundary>);
};

export default AppProviders;

