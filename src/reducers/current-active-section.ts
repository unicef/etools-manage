import { createSlice } from 'redux-starter-kit';

const currentActiveSection = createSlice({
    initialState: -1,
    reducers: {
        onCurrentActiveSection: (state, action) => action.payload

    }
});
export const { onCurrentActiveSection } = currentActiveSection.actions;
export const { reducer: cuurentActiveSectionReducer } = currentActiveSection;
