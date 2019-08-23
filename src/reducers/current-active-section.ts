import { createSlice } from 'redux-starter-kit';
import { renderSectionsList } from 'actions/action-constants';

const currentActiveSection = createSlice({
    initialState: -1,
    reducers: {
        onCurrentActiveSection: (state, action) => action.payload
    },
    extraReducers: {
        [renderSectionsList.type]: () => -1
    }
});
export const { onCurrentActiveSection } = currentActiveSection.actions;
export const { reducer: cuurentActiveSectionReducer } = currentActiveSection;
