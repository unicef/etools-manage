import { makeReducer } from 'utils';
import { onSetLoading } from 'actions';


export const loadingReducer = makeReducer({
    [onSetLoading.type]: (state, action) => {
        state.loading = action.payload;
    }
});
