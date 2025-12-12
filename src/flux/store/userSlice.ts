import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    username: string | null;
    user_token: string | null;
    games_played: number | null;
    profile_picture: string | null;
}

const initial_state: UserState = {
    username: null,
    user_token: null,
    games_played: null,
    profile_picture: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initial_state,
    reducers: {
        setUser: (state, action: PayloadAction<{username: string, user_token: string, games_played: number, profile_picture: string }>) => {
            state.username = action.payload.username;
            state.user_token = action.payload.user_token;
            state.games_played = action.payload.games_played;
            state.profile_picture = action.payload.profile_picture;
        },
        logout: (state: UserState) => {
            state.username = null;
            state.user_token = null;
            state.games_played = null;
            state.profile_picture = null;
        }
    }
});

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer;