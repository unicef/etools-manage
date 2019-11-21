import { createSlice } from '@reduxjs/toolkit';

const createdSection = createSlice({
    name: 'createdSection',
    initialState: null,
    reducers: {
        onCreateSectionSuccess: (state, action) => action.payload,
        onResetCreatedSection: () => null
    }
});
export const { onCreateSectionSuccess, onResetCreatedSection } = createdSection.actions;
export const { reducer: createdSectionReducer } = createdSection;
