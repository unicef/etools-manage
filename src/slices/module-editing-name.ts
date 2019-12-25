import { createSlice } from '@reduxjs/toolkit';
import { EditComponentKeys } from 'entities/types';

const initialState: EditComponentKeys = '';
const moduleEditingName = createSlice({
    name: 'moduleEditingName',
    initialState,
    reducers: {
        onSetModuleEditingName: (state, action) => action.payload
    }
});
export const { onSetModuleEditingName } = moduleEditingName.actions;
export const { reducer: moduleEditingNameReducer } = moduleEditingName;
