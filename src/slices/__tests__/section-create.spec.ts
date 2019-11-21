import SectionsApiService from '../../services/section';
import configureAppStore from 'lib/create-store';
import { onSubmitCreateSection } from '../../actions';
import { testSectionsList, testCreateSection } from './fixtures/sections';

jest.mock('../../services/section');

const mockSectionsList = testSectionsList;
const mockCreatedSection = testCreateSection;

describe('Create new section', () => {
    let store, service;
    let mockGetSections = jest.fn(() => mockSectionsList);
    let mockCreateSection = jest.fn(() => mockCreatedSection);

    beforeAll(() => {
        store = configureAppStore();
        SectionsApiService.mockImplementation(() => {
            return {
                getSections: mockGetSections,
                createSection: mockCreateSection
            };
        });
    });

    beforeEach(() => {
        SectionsApiService.mockClear();
        service = new SectionsApiService();
    });

    test('calls create section api, middleware updates sections list', async () => {
        await store.dispatch(onSubmitCreateSection(service, testCreateSection));
        const state = store.getState();
        expect(mockGetSections.mock.calls.length).toBe(1);
        expect(state.createdSection).toEqual(testCreateSection);
    });
});
