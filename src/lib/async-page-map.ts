import {
    PAGE_ONE,
    PAGE_TWO
    // PAGE_THREE
} from '../global-constants';

export default {
    [PAGE_ONE]: () => import('pages/one'),
    [PAGE_TWO]: () => import('pages/two')
    // [PAGE_THREE]: () => import('pages/three')
};
