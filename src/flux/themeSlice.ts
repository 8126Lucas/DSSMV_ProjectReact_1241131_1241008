import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ThemeState {
    theme: 'light' | 'dark';
}

const initial_state: ThemeState = {
    theme: 'light',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: initial_state,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeState>) => {
            state.theme = action.payload.theme;
        }
    }
});

export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer;
