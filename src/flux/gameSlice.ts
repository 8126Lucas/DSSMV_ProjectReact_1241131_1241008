import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface GameConfigState {
    category: string | null;
    difficulty: string | null;
    type: string | null;
    number_of_questions: string | null;
    room_token: string | null;
}

const initial_state: GameConfigState = {
    category: null,
    difficulty: null,
    type: null,
    number_of_questions: null,
    room_token: null,
};

const gameSlice = createSlice({
    name: 'game',
    initialState: initial_state,
    reducers: {
        setGameConfig: (state, action: PayloadAction<GameConfigState>) => {
            state.category = action.payload.category;
            state.difficulty = action.payload.difficulty;
            state.type = action.payload.type;
            state.number_of_questions = action.payload.number_of_questions;
            state.room_token = action.payload.room_token;
        },
        clearGameConfig: (state) => {
            state.category = null;
            state.difficulty = null;
            state.type = null;
            state.number_of_questions = null;
            state.room_token = null;
        }
    }
});

export const {setGameConfig, clearGameConfig} = gameSlice.actions;
export default gameSlice.reducer;