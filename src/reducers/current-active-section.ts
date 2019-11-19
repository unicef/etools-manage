import { createSlice } from '@reduxjs/toolkit';
import { renderSectionsList } from 'actions/action-constants';

const currentActiveSection = createSlice({
    name: 'currentActiveSection',
    initialState: -1,
    reducers: {
        onCurrentActiveSection: (state, action) => action.payload
    },
    extraReducers: {
        [renderSectionsList.type]: () => -1
    }
});
export const { onCurrentActiveSection } = currentActiveSection.actions;
export const { reducer: cuurentActiveSectionReducer } = currentActiveSection;
