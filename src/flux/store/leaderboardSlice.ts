import {GameScore} from "@/components/leaderboard/LeaderboardFlatList";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface LeaderboardState {
    leaderboard_data: GameScore[] | null;
}

const initial_state: LeaderboardState = {
    leaderboard_data: null,
};

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState: initial_state,
    reducers: {
        setLeaderboardData: (state, action: PayloadAction<LeaderboardState>) => {
            state.leaderboard_data = action.payload.leaderboard_data;
        },
        deleteLeaderboardData: (state) => {
            state.leaderboard_data = null;
        }
    }
});

export const {setLeaderboardData, deleteLeaderboardData} = leaderboardSlice.actions;
export default leaderboardSlice.reducer;