import {createSlice} from "@reduxjs/toolkit";


interface UiState {
    modalOpenState: boolean;
    selectedBoardId: number | null,
    historyOpenState: boolean;
}

const initialState: UiState = {
    selectedBoardId: null,
    modalOpenState: false,
    historyOpenState: false,
};


const ui = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setModalOpenState(state, action) {
            state.modalOpenState = action.payload;
        },
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