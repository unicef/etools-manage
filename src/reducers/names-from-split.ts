import { createSlice } from 'redux-starter-kit';
import { renderSectionsList } from 'actions/action-constants';
import { SectionEntity } from 'entities/types';

const initialState: SectionEntity[] = [];

const sectionsFromSplit = createSlice({
    initialState,
    reducers: {
        updateNamesFromSplit: (state, action) => action.payload
    },
    extraReducers: {
        [renderSectionsList.type]: (state, action) => initialState
    }
});

export const { updateNamesFromSplit } = sectionsFromSplit.actions;

export const { reducer: namesFromSplitReducer } = sectionsFromSplit;
