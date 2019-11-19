import React from 'react';
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
