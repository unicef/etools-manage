import { createSlice } from '@reduxjs/toolkit';
import { renderSectionsList } from 'actions/action-constants';
import { Section } from 'entities/types';

const initialState: Section[] = [];

const sectionsFromSplit = createSlice({
    name: 'sectionsFromSplit',
    initialState,
    reducers: {
        updateNamesFromSplit: (state, action) => action.payload
    },
    extraReducers: {
        [renderSectionsList.type]: () => initialState
    }
});

export const { updateNamesFromSplit } = sectionsFromSplit.actions;

export const { reducer: namesFromSplitReducer } = sectionsFromSplit;
