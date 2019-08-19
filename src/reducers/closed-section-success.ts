import { createSlice } from 'redux-starter-kit';
import { renderSectionsList } from 'actions/action-constants';

const closedSectionSuccess = createSlice({
    initialState: false,
    reducers: {
        onSuccessCloseSection: () => true
    },
    extraReducers: {
        [renderSectionsList.type]: () => false
    }
});
export const { onSuccessCloseSection } = closedSectionSuccess.actions;
export const { reducer: closedSectionSuccessReducer } = closedSectionSuccess;
