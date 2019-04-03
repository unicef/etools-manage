import { connectRoutes } from 'redux-first-router';
import { AnyAction } from 'redux';
import queryString from 'query-string';
import {
    PAGE_ONE,
    PAGE_TWO,
    PAGE_THREE
} from '../global-constants';
import { onRouteTransition } from '../actions';

// const idMatcher = ':id(\\d+)';


// TODO: check if constants should be  defined here
export const ROUTE_MAPPING = {
    [PAGE_ONE]: '/',
    [PAGE_TWO]: '/two',
    [PAGE_THREE]: '/three'
};

const shouldPerformAction = (action: AnyAction): boolean => {
    if (!action) {
        return false;
    }
    const {
        meta: {
            location: {
                current: { type: currentType },
                prev: { type: prevType }
            }
        }
    } = action;
    console.log('SHOULD PERFORMA ACTION', currentType !== prevType);
    return currentType !== prevType && prevType;
};


const onBeforeChange = (dispatch, getState, { action }): void => {
    // Make sure the two routes are different.
    if (shouldPerformAction(action)) {
        dispatch(onRouteTransition());
    }
};

export default () => {
    return {
        ...connectRoutes(ROUTE_MAPPING, {
            querySerializer: queryString,
            onBeforeChange
        })
    };
};
