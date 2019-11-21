import React from 'react';
import { render } from '@testing-library/react';
import Box from '../box';

describe('Box', () => {
    test('renders', () => {
        render(<Box>Test</Box>);
    });

    test('mounts', () => {
        const { container } = render(<Box>Test</Box>);
        expect(container).toMatchSnapshot();
    });
});
