import React from 'react';
import { Provider } from 'react-redux';
import { propEq } from 'ramda';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, RenderOptions } from '@testing-library/react';
import { AppServicesProvider } from '../src/contexts/app';
import { Modals as ModalsProvider } from '../src/contexts/page-modals';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../src/lib/theme';

const connectedRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
    render(ui, options);

// re-export everything
export * from '@testing-library/react';

// override render method
export { connectedRender };

const Contexts = ({ children }) => (
    <ThemeProvider theme={theme}>
        <ModalsProvider>{children}</ModalsProvider>
    </ThemeProvider>
);

export function renderWithRedux(ui, { store }) {
    return {
        ...render(
            <Provider store={store}>
                <AppServicesProvider>
                    <Router>
                        <Contexts>{ui}</Contexts>
                    </Router>
                </AppServicesProvider>
            </Provider>
        ),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store
    };
}

export const findAction = (actionsList, actionToFind) =>
    actionsList.find(propEq('type', actionToFind.type));
