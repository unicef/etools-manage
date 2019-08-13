import { createSlice } from 'redux-starter-kit';

const moduleEditingName = createSlice({
    initialState: '',
    reducers: {
        onSetModuleEditingName: (state, action) => action.payload

    }
});
export const { onSetModuleEditingName } = moduleEditingName.actions;
export const { reducer: moduleEditingNameReducer } = moduleEditingName;
