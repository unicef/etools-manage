import { createSlice } from 'redux-starter-kit';
import { renderSectionsList } from 'actions/action-constants';

const closedSectionSuccess = createSlice({
    initialState: false,
    reducers: {
        onSuccessCloseSection: (state, action) => true
    },
    extraReducers: {
        [renderSectionsList.type]: (state, action) => false
    }
});
export const { onSuccessCloseSection } = closedSectionSuccess.actions;
export const { reducer: closedSectionSuccessReducer } = closedSectionSuccess;
