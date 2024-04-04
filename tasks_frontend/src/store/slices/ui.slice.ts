import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalOpenState: false,
    historyOpenState: false
};


const ui = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setModalOpenState(state, action){
            state.modalOpenState = action.payload;
        },
        setHistoryOpenState(state, action){
            state.historyOpenState = action.payload;
        },

    },
});

export const uiActions = ui.actions;
export default ui.reducer;