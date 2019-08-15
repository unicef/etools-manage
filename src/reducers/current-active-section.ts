import { createSlice, createAction } from 'redux-starter-kit';
import { renderSectionsList } from 'actions/action-constants';


const currentActiveSection = createSlice({
    initialState: -1,
    reducers: {
        onCurrentActiveSection: (state, action) => action.payload,
        resetActiveSection: () => -1
    },
    extraReducers: {
        [renderSectionsList.type]: (state, action) => -1
    }
});
export const { onCurrentActiveSection, resetActiveSection } = currentActiveSection.actions;
export const { reducer: cuurentActiveSectionReducer } = currentActiveSection;
