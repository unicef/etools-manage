import { createSlice } from 'redux-starter-kit';

const initialState: string[] = [];

const namesFromSplit = createSlice({
    initialState,
    reducers: {
        updateNamesFromSplit: (state,action) => action.payload,
    }
})

export const { updateNamesFromSplit } = namesFromSplit.actions;

export const { reducer: namesFromSplitReducer } = namesFromSplit;
