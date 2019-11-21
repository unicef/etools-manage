import { createSlice } from '@reduxjs/toolkit';
import { ACTION_BAR_DISABLED_ACTIONS } from 'pages/close-section/constants';
import { onSuccessCloseSection } from './closed-section-success';
import { ActionBarKeys } from 'pages/close-section/types';

export const uiInitialState: {
    selectedMenuIdx: number;
    closeSectionActionBar: ActionBarKeys;
    viewCloseSummary: boolean;
} = {
    selectedMenuIdx: 0,
    closeSectionActionBar: ACTION_BAR_DISABLED_ACTIONS,
    viewCloseSummary: false
};
export const ui = createSlice({
    name: 'ui',
    initialState: uiInitialState,
    reducers: {
        onSelectMenuItem: (state, action) => {
            state.selectedMenuIdx = action.payload;
        },
        setCloseSectionActionBar: (state, action) => {
            state.closeSectionActionBar = action.payload;
        },
        onSetViewCloseSummary: (state, action) => {
            state.viewCloseSummary = action.payload;
        }
    },
    extraReducers: {
        [onSuccessCloseSection.type]: state => {
            state.viewCloseSummary = false;
        }
    }
});
export const { onSelectMenuItem, setCloseSectionActionBar, onSetViewCloseSummary } = ui.actions;
export const { reducer: uiReducer } = ui;
