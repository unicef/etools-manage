import { openSidebar, closeSidebar, onRouteTransition } from '../actions';
import { AnyAction } from 'redux';

export const isSidebarOpenReducer = (state = false, action: AnyAction): boolean => {
    if (action.type === openSidebar.type) {
        return true;
    }

    if (action.type === closeSidebar.type || action.type === onRouteTransition.type || action.type.indexOf('OPEN_MODAL') >= 0) {
        return false;
    }

    return state;
};
