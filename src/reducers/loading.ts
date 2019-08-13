import { createSlice } from 'redux-starter-kit';


export const loading = createSlice({
    initialState: false,
    reducers: {
        onSetLoading: (state, action) => action.payload

    }
});
export const { onSetLoading } = loading.actions;
export const { reducer: loadingReducer } = loading;
