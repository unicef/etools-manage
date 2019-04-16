import { menuItemsReducer } from '../menu';
import { onSetMenuItems } from '../../actions';

describe('Menu Items Reducer', () => {
    let initialState, mockAction;
    beforeEach(() => {
        initialState;
        mockAction = {
            type: '',
            payload: ['']
        };
    });

    test('default state', () => {
        const state0 = menuItemsReducer(initialState, mockAction);
        expect(state0).toEqual([
            { text: 'Page One', icon: 'inbox', url: '/' },
            { text: 'Page Two', icon: 'starred', url: '/two' }
        ]);
    });

    test('sets menu items successfully', () => {
        const mockPayload = [{ text: 'test', icon: 'inbox', url: '/test' }];
        mockAction = {
            type: onSetMenuItems.type,
            payload: mockPayload
        };

        const state0 = menuItemsReducer(initialState, mockAction);
        expect(state0).toEqual(mockPayload);
    });
});
