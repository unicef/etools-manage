import React from 'react';
import theme from 'lib/theme';
import { ThemeProvider } from '@material-ui/styles';

export default function withThemeProvider({ children }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}

