import { createSlice } from 'redux-starter-kit';
import { ACTION_BAR_DISABLED_ACTIONS } from 'pages/close-section/constants';


export const ui = createSlice({
    initialState: {
        selectedMenuIdx: 0,
        closeSectionActionBar: ACTION_BAR_DISABLED_ACTIONS,
        viewCloseSummary: false
    },
    reducers: {
        onSelectMenuItem: (state, action) => action.payload

    }
});
export const { onSelectMenuItem } = ui.actions;
export const { reducer: uiReducer } = ui;

