import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';
import leaderboardReducer from './leaderboardSlice';
import themeReducer from './themeSlice';
import appReducer from './appSlice';
import gameReducer from './gameSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        leaderboard: leaderboardReducer,
        theme: themeReducer,
        app: appReducer,
        game: gameReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;