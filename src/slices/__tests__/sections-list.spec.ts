import { onGetSectionsSuccess } from '../sections';
import { testSectionsList } from './fixtures/sections';
import configureAppStore from 'lib/create-store';
import { selectSections, selectAllSections } from 'selectors';

describe('Sections list ', () => {
    let store;

    beforeAll(() => {
        store = configureAppStore();
    });

    test('sections received from api call are added to store correctly', async () => {
        await store.dispatch(onGetSectionsSuccess(testSectionsList));
        const storeSections = selectAllSections(store.getState());
        expect(storeSections).toEqual(testSectionsList);
    });

    test('default selector for sections should only include inactive sections in list by default', async () => {
        await store.dispatch(onGetSectionsSuccess(testSectionsList));
        const storeSections = selectSections(store.getState());
        expect(storeSections).not.toContain(testSectionsList[2]);
    });
});
