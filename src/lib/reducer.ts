import combineNestedReducers from 'combine-nested-reducers';
import { isSidebarOpenReducer } from '../reducers/sidebar';
import pageReducer from '../reducers/page';
// import { version } from '../../package';

export default function rootReducer(additionalReducers = { location: '' }) {
    return combineNestedReducers({
        // version: () => version,
        ui: {
            isSidebarOpen: isSidebarOpenReducer
        },
        page: pageReducer,
        ...additionalReducers
    });
}

export type AppState = ReturnType<typeof rootReducer>
