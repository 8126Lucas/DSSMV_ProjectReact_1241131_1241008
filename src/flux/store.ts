import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';
import leaderboardReducer from './leaderboardSlice';
import themeReducer from './themeSlice';
import appReducer from './appSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        leaderboard: leaderboardReducer,
        theme: themeReducer,
        app: appReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;