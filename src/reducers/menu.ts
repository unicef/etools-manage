import { menuItems } from '../actions';
import { createReducer } from 'redux-starter-kit';
import { MenuItem } from 'global-types';


const defaultMenuItems: MenuItem[] = [
    { text: 'Page One', icon: 'inbox', url: '/' },
    { text: 'Page Two', icon: 'starred', url: '/two' }
];

export const menuItemsReducer = createReducer(
    defaultMenuItems,
    {
        [menuItems.type]: (state, action) => action.payload
    }
);
