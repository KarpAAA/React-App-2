import {createSlice} from "@reduxjs/toolkit";


interface UiState {
    selectedBoardId: number | null,
    historyOpenState: boolean;
}

const initialState: UiState = {
    selectedBoardId: null,
    historyOpenState: false,
};


const ui = createSlice({
    name: "ui",
    initialState,
    reducers: {

        setHistoryOpenState(state, action) {
            state.historyOpenState = action.payload;
        },
        setSelectedBoard(state, action) {
            state.selectedBoardId = action.payload;
        },
        setSelectedBoardIdToInitial(state){
            state.selectedBoardId = initialState.selectedBoardId;
        }

    },
});

export const uiActions = ui.actions;
export default ui.reducer;