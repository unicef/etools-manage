import { createSlice } from '@reduxjs/toolkit';
import { EditComponentMappings } from 'pages/close-section';

const initialState: keyof EditComponentMappings | '' = '';
const moduleEditingName = createSlice({
    name: 'moduleEditingName',
    initialState,
    reducers: {
        onSetModuleEditingName: (state, action) => action.payload
    }
});
export const { onSetModuleEditingName } = moduleEditingName.actions;
export const { reducer: moduleEditingNameReducer } = moduleEditingName;
