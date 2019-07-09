import { makeReducer } from 'utils';
import { onToggleLoading } from 'actions';


export const loadingReducer = makeReducer({
    [onToggleLoading.type]: (state, action) => {
        state.loading = action.payload;
    }
});
