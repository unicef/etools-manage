import { createSlice } from 'redux-starter-kit';

const mergedSection = createSlice({
    initialState: null,
    reducers: {
        onSetMergedSection: (state, action) => action.payload
    }
});
export const { onSetMergedSection } = mergedSection.actions;
export const { reducer: mergedSectionReducer } = mergedSection;
