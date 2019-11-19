import { createSlice } from '@reduxjs/toolkit';
import { renderSectionsList } from 'actions/action-constants';

const currentActiveSectionId = createSlice({
    name: 'currentActiveSectionId',
    initialState: -1,
    reducers: {
        onCurrentActiveSection: (state, action) => action.payload
    },
    extraReducers: {
        [renderSectionsList.type]: () => -1
    }
});
export const { onCurrentActiveSection } = currentActiveSectionId.actions;
export const { reducer: cuurentActiveSectionReducer } = currentActiveSectionId;
