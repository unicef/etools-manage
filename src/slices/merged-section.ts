import { createSlice } from '@reduxjs/toolkit';
import { Section } from 'entities/types';

const initialState: Section | null = null;
const mergedSection = createSlice({
    name: 'mergedSection',
    initialState,
    reducers: {
        onSetMergedSection: (state, action) => action.payload
    }
});
export const { onSetMergedSection } = mergedSection.actions;
export const { reducer: mergedSectionReducer } = mergedSection;
