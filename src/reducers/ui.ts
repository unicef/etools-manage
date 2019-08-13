import { createSlice } from 'redux-starter-kit';


export const ui = createSlice({
    initialState: {
        selectedMenuIdx: 0

    },
    reducers: {
        onSelectMenuItem: (state, action) => action.payload

    }
});
export const { onSelectMenuItem } = ui.actions;
export const { reducer: uiReducer } = ui;

