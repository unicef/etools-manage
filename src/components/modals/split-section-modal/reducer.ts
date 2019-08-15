import { createSlice } from 'redux-starter-kit';

export const splitSectionInitialState = {
    nameOne: '',
    nameTwo: ''
};

const splitModalSlice = createSlice({
    initialState: splitSectionInitialState,
    reducers: {
        setNameOne: (state, action) => {
            state.nameOne = action.payload;
        },
        setNameTwo: (state, action) => {
            state.nameTwo = action.payload;
        }
    }
});


export const {
    setNameOne,
    setNameTwo
} = splitModalSlice.actions;

export const { reducer: splitModalReducer } = splitModalSlice;
