import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { AudioPlayer } from 'expo-audio';

interface UserState {
    username: string | null;
    user_token: string | null;
    games_played: number | null;
    profile_picture: string | null;
    win_sound: string | null;
    language: string | null;
}

const initial_state: UserState = {
    username: null,
    user_token: null,
    games_played: null,
    profile_picture: null,
    win_sound: null,
    language: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initial_state,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.username = action.payload.username;
            state.user_token = action.payload.user_token;
            state.games_played = action.payload.games_played;
            state.profile_picture = action.payload.profile_picture;
            state.win_sound = action.payload.win_sound;
            state.language = action.payload.language;
        },
        logout: (state: UserState) => {
            state.username = null;
            state.user_token = null;
            state.games_played = null;
            state.profile_picture = null;
            state.win_sound = null;
            state.language = null;
        }
    }
});

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer;