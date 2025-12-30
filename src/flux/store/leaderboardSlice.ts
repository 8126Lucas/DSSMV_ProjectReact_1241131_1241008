import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameScore} from "@/src/types/GameScore";

interface LeaderboardState {
    user_leaderboard_data?: GameScore[] | null;
    global_leaderboard_data?: GameScore[] | null;
}

const initial_state: LeaderboardState = {
    user_leaderboard_data: null,
    global_leaderboard_data: null,
};

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState: initial_state,
    reducers: {
        setUserLeaderboardData: (state, action: PayloadAction<LeaderboardState>) => {
            state.user_leaderboard_data = action.payload.user_leaderboard_data;
        },
        deleteUserLeaderboardData: (state) => {
            state.user_leaderboard_data = null;
        },
        setGlobalLeaderboardData: (state, action: PayloadAction<LeaderboardState>) => {
            state.global_leaderboard_data = action.payload.global_leaderboard_data;
        },
        deleteGlobalLeaderboardData: (state) => {
            state.global_leaderboard_data = null;
        },
        setLeaderboardData: (state, action: PayloadAction<LeaderboardState>) => {
            state.user_leaderboard_data = action.payload.user_leaderboard_data;
            state.global_leaderboard_data = action.payload.global_leaderboard_data;
        },
        deleteLeaderboardData: (state, action: PayloadAction<LeaderboardState>) => {
            state.user_leaderboard_data = null;
            state.global_leaderboard_data = null;
        },
    }
});

export const {setUserLeaderboardData, deleteUserLeaderboardData, setGlobalLeaderboardData, deleteGlobalLeaderboardData, setLeaderboardData, deleteLeaderboardData} = leaderboardSlice.actions;
export default leaderboardSlice.reducer;