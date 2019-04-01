import combineNestedReducers from 'combine-nested-reducers';
import { menuItemsReducer } from '../reducers/menu';
import pageReducer from '../reducers/page';
import { ReducerMap } from 'global-types';

export default function createReducer(additionalReducers: ReducerMap) {
    return combineNestedReducers({

        // add some ui global state if needed here
        ui: {
            menuItems: menuItemsReducer
        },

        page: pageReducer,
        ...additionalReducers
    });
}

export type AppState = ReturnType<typeof createReducer>
