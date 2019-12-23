import React from 'react';
import configureStore from 'redux-mock-store';
import 'jest-dom/extend-expect';

import thunk from 'redux-thunk';
import { CloseSectionRender } from '../../close-section/index';
import { splitSectionState } from './fixtures/split-section-state';
import { getOptionsWithoutExisting } from '../../../selectors';
import { renderWithRedux } from '../../../../test/test-utils';

describe('Split section page', () => {
    const mockStore = configureStore([thunk]);
    let state;
    beforeAll(() => {
        state = {
            ...splitSectionState,
            sectionsFromSplit: [
                {
                    name: 'Strategic',
                    active: true
                },
                {
                    name: 'Partnership',
                    active: true
                }
            ]
        };
    });
    test('new section names entered are available as options for selection', async () => {
        const options = getOptionsWithoutExisting([
            'Child Protection',
            'Child Survival and Development'
        ])(state);
        expect(options).toContainEqual({ label: 'Strategic', value: 'Strategic' });
        expect(options).toContainEqual({ label: 'Partnership', value: 'Partnership' });
    });

    test('displays old section name and new section names being created from split', async () => {
        const store = mockStore(state);

        const { getByText } = await renderWithRedux(<CloseSectionRender />, {
            store
        });

        const closingName = getByText(/Strategic Communication and Partnership/i);
        expect(closingName).toBeInTheDocument();

        const newSections = getByText(/Strategic & Partnership/i);
        expect(newSections).toBeInTheDocument();
    });
});
