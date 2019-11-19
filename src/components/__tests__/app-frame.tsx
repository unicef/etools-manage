import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
// import { initialState, reducer } from './reducer.js';
import { AppFrame } from '../app-frame';
import { getInProgressSuccess } from '../../reducers/in-progress-items';

import { propEq } from 'ramda';
import { onGetSectionsSuccess } from '../../reducers/sections';
import { requestStarted } from '../../reducers/loading';

// const initialState = {
//     closeSectionPayload: {
//         interventions: {},
//         travels: {},
//         actionPoints: {},
//         tpmActivities: {}
//     },
//     sections: [],
//     createdSection: null,
//     mergedSection: null,
//     error: '',
//     loading: true,
//     moduleEditingName: '',
//     currentActiveSectionId: -1,
//     closedSectionSuccess: false,
//     ui: {
//         selectedMenuIdx: 0,
//         closeSectionActionBar: 'action-bar-disabled',
//         viewCloseSummary: false
//     },
//     user: null,
//     sectionsFromSplit: [],
//     inProgressItems: []
// };

const mockStorageService = {
    _storage: {},
    storeEntitiesData() {},
    getStoredEntitiesData() {
        return null;
    },
    getAllItems() {
        return ['split_8_Lebanon'];
    },
    removeItem() {
        return null;
    }
};

const testSections = [{ id: 1, name: 'test section 1' }];
const mockSectionsService = {
    getSections() {
        return testSections;
    },
    createSection() {
        return {};
    },
    mergeSections() {
        return {};
    },
    closeSection() {
        return {};
    }
};

export function renderWithRedux(ui, { store }) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store
    };
}

const findAction = (actionsList, actionToFind) =>
    actionsList.find(propEq('type', actionToFind.type));

describe('<AppFrame/>', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({
        user: {
            country: {
                name: 'Lebanon'
            }
        },
        loading: true
    });

    let rendered;

    beforeEach(async () => {
        rendered = await renderWithRedux(
            <AppFrame storageService={mockStorageService} sectionsService={mockSectionsService} />,
            { store }
        );
    });

    test('fetches sections on render', async () => {
        const actions = store.getActions();
        const sectionsSuccessAction = findAction(actions, onGetSectionsSuccess);
        expect(sectionsSuccessAction.payload[0].name).toEqual(testSections[0].name);
    });

    test('gets in progress items from storage', () => {
        const actions = store.getActions();
        const storageLookupAction = findAction(actions, getInProgressSuccess);
        expect(storageLookupAction).toBeDefined;
    });

    test('loader is shown when data being fetched', async () => {
        store.dispatch(requestStarted());
        const { queryByTestId } = rendered;
        const loader = queryByTestId('loader-full');
        expect(loader).not.toBeNull;
    });
});
