import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    taskList: {
        title: '',
        number: 0
    }
};


const taskListForm = createSlice({
    name: "taskListForm",
    initialState,
    reducers: {
        taskPropertyChange(state, action){
            const {property, value} = action.payload;
            return {
                ...state,
                taskList: {
                    ...state.taskList,
                    [property]: value,
                },
            };
        },
        clearToInitial(state){
            state.taskList = {...initialState.taskList};
        },
        setEditTaskList(state, action){
            state.taskList = {...action.payload};
        }
    },
});

export const taskListFormActions= taskListForm.actions;
export default taskListForm.reducer;