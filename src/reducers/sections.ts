import { createSlice } from 'redux-starter-kit';
import { SectionEntity } from 'entities/types';
import { uniqBy, prop } from 'ramda';

const initialState: SectionEntity[] = []

const sections = createSlice({
    initialState,
    reducers: {
        onGetSectionsSuccess: (state, action) => action.payload,
    }
});

export const { onGetSectionsSuccess } = sections.actions;
export const { reducer: sectionsReducer } = sections;

