import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    board: {
        title: ''
    }
};


const boardForm = createSlice({
    name: "boardForm",
    initialState,
    reducers: {
        boardPropertyChange(state, action){
            const {property, value} = action.payload;
            return {
                ...state,
                board: {
                    ...state.board,
                    [property]: value,
                },
            };
        },
        clearToInitial(state){
            state.board = {...initialState.board};
        },

    },
});

export const boardFormAction = boardForm.actions;
export default boardForm.reducer;