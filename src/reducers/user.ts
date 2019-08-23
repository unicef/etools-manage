import { UserProfile } from 'global-types';
import { createSlice } from 'redux-starter-kit';

const initialState: UserProfile | null = null;

const user = createSlice({
    initialState,
    reducers: {
        onUserProfileSuccess: (state, action) => action.payload
    }
});

export const { onUserProfileSuccess } = user.actions;
export const { reducer: userReducer } = user;
