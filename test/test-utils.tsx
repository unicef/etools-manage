import { render } from '@testing-library/react';
import AppProviders from '../src/components/app-providers';

const AllTheProviders = ({ children }) => {
    // eslint-disable-next-line
    return <AppProviders>{children}</AppProviders>;
};

const connectedRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { connectedRender };
