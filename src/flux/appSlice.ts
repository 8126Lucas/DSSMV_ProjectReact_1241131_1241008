import {createSlice} from "@reduxjs/toolkit";

interface AppState {
    app_state: 'available' | 'maintenance' | 'offline';
    retry_trigger: number;
}

const initial_state: AppState = {
    app_state: 'available',
    retry_trigger: 0,
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
        setNoInternet: (state) => {
            state.app_state = 'offline';
        },
        setRetryOn: (state) => {
            state.retry_trigger++;
            state.app_state = 'available';
        },
    }
});

export const {setAvailable, setMaintenance, setNoInternet, setRetryOn} = appSlice.actions;
export default appSlice.reducer;