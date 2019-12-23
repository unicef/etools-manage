import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppFrame } from '../app-frame';
import { getInProgressSuccess } from '../../slices/in-progress-items';

import { onGetSectionsSuccess } from '../../slices/sections';
import { requestStarted } from '../../slices/loading';
import { renderWithRedux, findAction } from '../../../test/test-utils';

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

describe('<AppFrame/>', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({
        user: {
            country: {
                name: 'Lebanon'
            }
        },
        loading: true,
        ui: {
            selectedMenuIdx: 0
        }
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
