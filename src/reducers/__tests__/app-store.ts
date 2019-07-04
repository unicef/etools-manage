import { appStoreReducer } from '../app-store';
import { onGetSectionsSuccess } from 'actions';

describe('App store reducer', () => {
    let initialState, mockAction;
    beforeEach(() => {
        initialState = {
            sections: []
        };
        mockAction = {
            type: '',
            payload: ['']
        };
    });

    test('default state', () => {
        const state0 = appStoreReducer(initialState, mockAction);
        expect(state0).toEqual(initialState);
    });

    test('sets sections successfully', () => {
        const mockPayload = [{ name: 'Section 1', id: 0 }];
        const state0 = appStoreReducer(initialState, onGetSectionsSuccess(mockPayload));
        console.log('TCL: state0', state0.sections === mockPayload);
        expect(state0.sections).toEqual(mockPayload);
    });

});
