import { menuItems, pageOne, pageTwo } from '../actions';
import { createReducer } from 'redux-starter-kit';
import { MenuItem } from 'global-types';


const defaultMenuItems: MenuItem[] = [
    { text: 'Page One', icon: 'inbox', type: pageOne.type },
    { text: 'Page Two', icon: 'starred', type: pageTwo.type }
];

export const menuItemsReducer = createReducer(
    defaultMenuItems,
    {
        [menuItems.type]: (state, action) => action.payload
    }
);
