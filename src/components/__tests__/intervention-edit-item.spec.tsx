import React from 'react';
import { renderWithRedux } from '../../../test/test-utils';
import { fireEvent, waitForElement } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { InterventionEditItem } from '../entity-edit/intervention-edit-item';
import { mockStateInterventionEdit } from './fixtures/store';
import IndicatorEditItem from '../entity-edit/indicator-edit-item';
import 'jest-dom/extend-expect';

jest.mock('../entity-edit/indicator-edit-item', () => {
    return jest.fn(() => null);
});

describe('<InterventionEditItem/>', () => {
    const mockStore = configureStore([thunk]);
    let store, render;

    beforeEach(async () => {
        store = mockStore(mockStateInterventionEdit);
        render = await renderWithRedux(<InterventionEditItem id={86} />, { store });
    });
    test('allows multiple sections to be selected', () => {
        const { getByTestId } = render;
        const multidropdown = getByTestId('dropdown-multi');
        expect(multidropdown).toBeInTheDocument();
    });
    test('shows caret button when indicators are present', () => {
        const { getByTestId } = render;
        const caretBtn = getByTestId('dropdown-caret-down');
        expect(caretBtn).toBeInTheDocument();
    });

    describe('<IndicatorEditItem/>', () => {
        test('only has sections of parent intervention as options', async () => {
            const { getByTestId } = render;
            const caretBtn = getByTestId('dropdown-caret-down');
            fireEvent.click(caretBtn);
            const propsForIndicatorEdit = IndicatorEditItem.mock.calls[0][0];

            expect(propsForIndicatorEdit.sectionOptions).toEqual([
                {
                    label: 'Child Survival and Development',
                    value: 'Child Survival and Development'
                },
                { label: 'Management', value: 'Management' }
            ]);
        });
    });
});
