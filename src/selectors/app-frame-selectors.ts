import { get } from 'micro-dash';

export const selectMenuItems = state => get(state, ['ui', 'menuItems'], []);
