import React from 'react';
import { renderWithRedux, findAction, getByTestId } from '../../../../test/test-utils';
import BackendService from '../../../services/backend';
import { onFetchDataCloseSection } from '../actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import StorageService from '../../../services/storage';
import {
    closeSectionDataReceived,
    onChangeInterventionSection
} from '../../../slices/close-section-payload';
import { onUserProfileSuccess } from '../../../slices/user';
import configureAppStore from '../../../lib/create-store';
import 'jest-dom/extend-expect';

import { selectCloseSectionPayload } from '../../../selectors';
import { selectTotalProgress } from '../../../selectors/num-items-resolved';
import {
    mockDataCloseSectionPayloadState,
    mockDataUserProfile,
    mockDataCloseSectionAllResolvedState,
    mockDataHalfResolvedCloseSectionPayload
} from './fixtures/state-fixture';
import { CloseSectionPage } from '../close-section-page';
describe('Close Section Page', () => {
    const mockStore = configureStore([thunk]);

    describe('data fetching', () => {
        afterEach(() => {
            store.clearActions();
        });

        const store = mockStore({});

        const mockBackendService: Partial<BackendService> = {};

        let mockStorageService: Partial<StorageService> = {};

        const mockApiResponse = {
            interventions: ['one'],
            tpmActivities: ['two']
        };

        const mockStorageResponse = {
            travels: ['one'],
            actionPoints: ['two']
        };

        const payload = {
            id: 4,
            countryName: 'Lebanon'
        };

        test('fetches data for affected entities if none in storage', async () => {
            mockStorageService.getStoredEntitiesData = () => null;
            mockBackendService.getEntitiesForClose = async () => mockStorageResponse;
            await store.dispatch(
                onFetchDataCloseSection(
                    {
                        backendService: mockBackendService,
                        storageService: mockStorageService
                    },
                    payload
                )
            );

            const actions = store.getActions();
            const fetchSuccessAction = findAction(actions, closeSectionDataReceived);
            expect(fetchSuccessAction).toBeDefined;
        });

        test('fetches data from storage if present', async () => {
            const store = configureAppStore();

            mockStorageService.getStoredEntitiesData = () => mockApiResponse;
            await store.dispatch(
                onFetchDataCloseSection(
                    {
                        backendService: mockBackendService,
                        storageService: mockStorageService
                    },
                    payload
                )
            );
            expect(selectCloseSectionPayload(store.getState())).toEqual(mockApiResponse);
        });
    });

    describe('rendering components', () => {
        let store, rendered;
        beforeAll(async () => {});
        test('renders only modules that are affected by close', async () => {
            store = mockStore(mockDataCloseSectionPayloadState);

            rendered = await renderWithRedux(<CloseSectionPage />, { store });

            const { getByText, queryByText } = rendered;

            expect(getByText('PMP')).toBeInTheDocument();
            expect(getByText('Third Party Monitoring')).toBeInTheDocument();
            expect(getByText('Action Points')).toBeInTheDocument();
            // queryByText used since getByText throws when node doesn't exist
            expect(queryByText('Travels')).toBeNull();
        });

        test('displays correct resolved items number before and after a section is selected', async () => {
            const store = configureAppStore();
            const { getByTestId } = await renderWithRedux(<CloseSectionPage />, {
                store
            });
            await store.dispatch(
                closeSectionDataReceived(mockDataCloseSectionPayloadState.closeSectionPayload)
            );
            //need profile for country.name used by a component of the page
            await store.dispatch(onUserProfileSuccess(mockDataUserProfile));

            const ourTestNode = getByTestId('PMP');

            expect(ourTestNode).toHaveTextContent('Resolved items: 0/3');

            await store.dispatch(
                onChangeInterventionSection({
                    id: '54',
                    sections: ['Basic Needs Winter Response']
                })
            );

            expect(ourTestNode).toHaveTextContent('Resolved items: 1/3');
        });

        describe('action bar', () => {
            let rendered, store;

            beforeEach(async () => {
                store = configureAppStore();
                rendered = await renderWithRedux(<CloseSectionPage />, {
                    store
                });
            });

            test('action bar disables confirm when not all items resolved', async () => {
                const { getByTestId } = rendered;
                await store.dispatch(
                    closeSectionDataReceived(mockDataCloseSectionPayloadState.closeSectionPayload)
                );

                const actionBar = getByTestId('actionbar-disabled');
                expect(actionBar).toBeInTheDocument();
            });

            test('action bar confirm button enabled when all items resolved', async () => {
                const { getByTestId } = rendered;
                await store.dispatch(
                    closeSectionDataReceived(mockDataCloseSectionAllResolvedState)
                );

                const actionBar = getByTestId('actionbar-review');
                expect(actionBar).toBeInTheDocument();
            });

            test('action bar submit button shown when no items to resolve', async () => {
                const { getByTestId } = rendered;
                await store.dispatch(closeSectionDataReceived({}));

                const actionBar = getByTestId('actionbar-confirm');
                expect(actionBar).toBeInTheDocument();
            });
        });

        describe('progress bar', () => {
            test.only('calculates and displays progress for each type of entity correctly', async () => {
                // we use mockStore instead of real store because dispatching `closeSectionDataReceived`
                // will remove all sections on each entity via middleware. This way lets us test a pre-set store state
                // with some progress
                const store = mockStore({
                    ...mockDataCloseSectionPayloadState,
                    closeSectionPayload: { ...mockDataHalfResolvedCloseSectionPayload }
                });

                const { getByTestId } = await renderWithRedux(<CloseSectionPage />, {
                    store
                });

                const progressBar = getByTestId('resolved-items-progress');
                expect(progressBar).toHaveTextContent('Resolved items progress 50%');
            });
        });
    });
});
