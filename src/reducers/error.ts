import { createSlice } from 'redux-starter-kit';

export const error = createSlice({
    initialState: '',
    reducers: {
        onThrowError: (state, action) => action.payload
    }
});

export const { onThrowError } = error.actions;
export const { reducer: errorReducer } = error;
