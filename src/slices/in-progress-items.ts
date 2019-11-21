import { createSlice } from '@reduxjs/toolkit';
import { without } from 'ramda';

const initialState: string[] = [];

const inProgressItems = createSlice({
    name: 'inProgressItems',
    initialState,
    reducers: {
        getInProgressSuccess: (state, action) => action.payload,
        addItemToInProgress: (state, action) => {
            state.push(action.payload);
            return state;
        },
        removeItemFromInProgress: (state, action) => {
            const item = action.payload;
            return without([item], state);
        }
    }
});

export const {
    getInProgressSuccess,
    addItemToInProgress,
    removeItemFromInProgress
} = inProgressItems.actions;
export const { reducer: inProgressItemsReducer } = inProgressItems;
