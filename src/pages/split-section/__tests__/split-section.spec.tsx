import React from 'react';
import configureStore from 'redux-mock-store';
import 'jest-dom/extend-expect';

import thunk from 'redux-thunk';
import { CloseSectionRender } from '../../close-section/index';
import { splitSectionState } from './fixtures/split-section-state';
import { getOptionsWithoutExisting } from '../../../selectors';
import { renderWithRedux } from '../../../../test/test-utils';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Routes } from '../../../components/router';
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
        const Routed = (
            <MemoryRouter>
                <CloseSectionRender />
            </MemoryRouter>
        );
        const { getByText } = await renderWithRedux(Routed, {
            store
        });

        const closingName = getByText(/Strategic Communication and Partnership/i);
        expect(closingName).toBeInTheDocument();

        const newSections = getByText(/Strategic & Partnership/i);
        expect(newSections).toBeInTheDocument();
    });

    test('attempt to split invalid section id displays redirects to main and displays error', async () => {
        const store = mockStore(state);
        const history = createMemoryHistory();
        const nonExistantSectionId = 7;
        expect(splitSectionState.sections.find(s => s.id === nonExistantSectionId)).toBeUndefined();
        history.push(`/split/${nonExistantSectionId}`);
        const CustomRouter = () => (
            <Router history={history}>
                <Routes />
            </Router>
        );
        const { getByText } = await renderWithRedux(<CustomRouter />, {
            store
        });
        expect(getByText(/Invalid section id/i)).toBeInTheDocument();
    });

    test('attempt to split section without saved new names redirects to split section modal', async () => {
        const store = mockStore(state);
        const history = createMemoryHistory();
        history.push(`/split/2`);
        const CustomRouter = () => (
            <Router history={history}>
                <Routes />
            </Router>
        );
        const { getByText } = await renderWithRedux(<CustomRouter />, {
            store
        });
        const sectionName = state.sections[0].name;
        expect(getByText(sectionName)).toBeInTheDocument();
    });
});
