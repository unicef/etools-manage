import { createSlice } from '@reduxjs/toolkit';
import { renderSectionsList } from 'actions/action-constants';

const currentActiveSectionId = createSlice({
    name: 'currentActiveSectionId',
    initialState: -1,
    reducers: {
        currentActiveSectionChanged: (state, action) => action.payload
    },
    extraReducers: {
        [renderSectionsList.type]: () => -1
    }
});
export const { currentActiveSectionChanged } = currentActiveSectionId.actions;
export const { reducer: cuurentActiveSectionReducer } = currentActiveSectionId;
