import { createSlice } from 'redux-starter-kit';


const createdSection = createSlice({
    initialState: null,
    reducers: {
        onCreateSectionSuccess: (state, action) => action.payload,
        onResetCreatedSection: () => null
    }
});
export const {
    onCreateSectionSuccess,
    onResetCreatedSection } = createdSection.actions;
export const { reducer: createdSectionReducer } = createdSection;
