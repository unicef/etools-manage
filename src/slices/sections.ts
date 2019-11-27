import { createSlice } from '@reduxjs/toolkit';
import { Section } from 'entities/types';

const initialState: Section[] = [];

const sections = createSlice({
    name: 'sections',
    initialState,
    reducers: {
        onGetSectionsSuccess: (state, action) => action.payload
    }
});

export const { onGetSectionsSuccess } = sections.actions;
export const { reducer: sectionsReducer } = sections;
