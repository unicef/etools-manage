import React from 'react';
import { renderWithRedux } from '../../../../test/test-utils';
import { fireEvent, waitForElement } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockStateForTable } from './fixtures/state-fixtures';
import SectionsMainPage from '../../../pages/sections-main';

// required for sections table element

describe('<SectionsMain/>', () => {
    const mockStore = configureStore([thunk]);

    let store, render;
    beforeEach(async () => {
        store = mockStore(mockStateForTable);
        render = await renderWithRedux(<SectionsMainPage />, { store });
    });
    describe('<SectionsTable/>', () => {
        test('renders list of sections', async () => {
            const { getAllByTestId } = render;
            const items = await getAllByTestId(/section-row-item/i);
            expect(items).toHaveLength(8);
        });

        test('displays disabled items when merge mode is active for items in-progress', async () => {
            const { getByText, getByTestId } = render;
            const mergeBtn = getByText('Merge');
            fireEvent.click(mergeBtn);
            const row = await waitForElement(() => getByTestId('section-row-item-47'));
            expect(row.className).toContain('makeStyles-rowDisabled-263');
        });
    });
});
