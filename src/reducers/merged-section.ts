import { createSlice } from '@reduxjs/toolkit';

const mergedSection = createSlice({
    name: 'mergedSection',
    initialState: null,
    reducers: {
        onSetMergedSection: (state, action) => action.payload
    }
});
export const { onSetMergedSection } = mergedSection.actions;
export const { reducer: mergedSectionReducer } = mergedSection;
