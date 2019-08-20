import rootReducer from 'reducers';
import { onGetSectionsSuccess } from 'reducers/sections';
import { AnyAction } from 'redux';
import { intialRootState } from '../../../test/fixtures';

describe('App store reducer', () => {
    let mockAction: AnyAction;
    beforeEach(() => {

        mockAction = {
            type: '',
            payload: ['']
        };
    });

    test('default state', () => {
        const state0 = rootReducer(intialRootState, mockAction);
        expect(state0).toEqual(intialRootState);
    });

    test('sets sections successfully', () => {
        const mockPayload = [{ name: 'Section 1', id: 0 }];
        const state0 = rootReducer(intialRootState, onGetSectionsSuccess(mockPayload));
        expect(state0.sections).toEqual(mockPayload);
    });

});
