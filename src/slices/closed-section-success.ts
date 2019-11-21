import { createSlice } from '@reduxjs/toolkit';
import { renderSectionsList } from 'actions/action-constants';

const closedSectionSuccess = createSlice({
    name: 'closedSectionSucces',
    initialState: false,
    reducers: {
        onSuccessCloseSection: () => true
    },
    extraReducers: {
        [renderSectionsList.type]: () => false
    }
});
export const { onSuccessCloseSection } = closedSectionSuccess.actions;
export const { reducer: closedSectionSuccessReducer } = closedSectionSuccess;
