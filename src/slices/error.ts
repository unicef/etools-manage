import { createSlice } from '@reduxjs/toolkit';

export const error = createSlice({
    name: 'error',
    initialState: '',
    reducers: {
        onThrowError: (state, action) => action.payload
    }
});

export const { onThrowError } = error.actions;
export const { reducer: errorReducer } = error;
