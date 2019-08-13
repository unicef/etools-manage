import { createSlice } from 'redux-starter-kit';

const closedSectionSuccess = createSlice({
    initialState: false,
    reducers: {
        onSuccessCloseSection: (state, action) => action.payload

    }
});
export const { onSuccessCloseSection } = closedSectionSuccess.actions;
export const { reducer: closedSectionSuccessReducer } = closedSectionSuccess;
