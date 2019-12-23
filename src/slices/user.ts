import { UserProfile } from 'global-types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserProfile | null = null;

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onUserProfileSuccess: (state, action) => action.payload
    }
});

export const { onUserProfileSuccess } = user.actions;
export const { reducer: userReducer } = user;
