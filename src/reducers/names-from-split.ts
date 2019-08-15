import { createSlice } from 'redux-starter-kit';
import { renderSectionsList } from 'actions/action-constants';

const initialState: string[] = [];

const namesFromSplit = createSlice({
    initialState,
    reducers: {
        updateNamesFromSplit: (state, action) => action.payload
    },
    extraReducers: {
        [renderSectionsList.type]: (state, action) => initialState
    }
});

export const { updateNamesFromSplit } = namesFromSplit.actions;

export const { reducer: namesFromSplitReducer } = namesFromSplit;
