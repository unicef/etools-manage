import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render } from 'react-testing-library';
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
