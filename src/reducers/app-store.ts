import { makeReducer } from 'utils';
import { onGetSectionsSuccess } from 'actions';


export const appStoreReducer = makeReducer({
    [onGetSectionsSuccess.type]: (state, action) => {
        state.sections = action.payload;
    }
});
