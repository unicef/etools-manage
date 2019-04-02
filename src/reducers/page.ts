import {
    PAGE_ONE,
    PAGE_TWO,
    PAGE_THREE
} from '../global-constants';

const ROUTE_MAPPING = {
    [PAGE_ONE]: PAGE_ONE,
    [PAGE_TWO]: PAGE_TWO,
    [PAGE_THREE]: PAGE_THREE
};

export default (state = PAGE_ONE, action) => {
    console.log('ROUTE ACTIONS', action);
    if (action.type === '@@redux-first-router/NOT_FOUND') {
        debugger;
    }
    return ROUTE_MAPPING[action.type] || state;

};
