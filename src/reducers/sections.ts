import { createSlice } from 'redux-starter-kit';
import { SectionEntity } from 'entities/types';

const initialState: SectionEntity[] = [];

const sections = createSlice({
    initialState,
    reducers: {
        onGetSectionsSuccess: (state, action) => action.payload
    }
});

export const { onGetSectionsSuccess } = sections.actions;
export const { reducer: sectionsReducer } = sections;
