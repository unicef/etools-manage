import { onGetSectionsSuccess } from 'reducers/sections';
import { testSectionsList } from './fixtures/sections';
import configureAppStore from 'lib/create-store';
import { selectSections, selectSectionsWithInactive } from 'selectors';

describe('Sections list ', () => {
    let store;

    beforeAll(() => {
        store = configureAppStore();
    });

    test('should add sections to store', async () => {
        await store.dispatch(onGetSectionsSuccess(testSectionsList));
        const storeSections = selectSectionsWithInactive(store.getState());
        expect(storeSections).toEqual(testSectionsList);
    });

    test('should only show inactive sections in list by default', async () => {
        await store.dispatch(onGetSectionsSuccess(testSectionsList));
        const storeSections = selectSections(store.getState());
        expect(storeSections).not.toContain(testSectionsList[2]);
    });
});
