import React from 'react';
import { Provider } from 'react-redux';

import { render, RenderOptions } from '@testing-library/react';
import AppProviders from '../src/components/app-providers';

const AllTheProviders: React.ComponentType = ({ children }: { children?: React.ReactNode }) => {
    // eslint-disable-next-line
    return <AppProviders>{children}</AppProviders>;
};

const connectedRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
    render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { connectedRender };

export function renderWithRedux(ui, { store }) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store
    };
}
