import {createSlice} from "@reduxjs/toolkit";

interface AppState {
    app_state: 'available' | 'maintenance'
}

const initial_state: AppState = {
    app_state: 'available',
};

const appSlice = createSlice({
    name: 'app',
    initialState: initial_state,
    reducers: {
        setAvailable: (state) => {
            state.app_state = 'available';
        },
        setMaintenance: (state) => {
            state.app_state = 'maintenance';
        },
    }
});

export const {setAvailable, setMaintenance} = appSlice.actions;
export default appSlice.reducer;