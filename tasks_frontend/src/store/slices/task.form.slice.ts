import {createSlice} from "@reduxjs/toolkit";
import DateHelpers from "../../utils/helpers/date.helpers";
import {TaskPriority} from "../../types/task.priority";
import {TaskStatus} from "../../types/task.status";

const initialState  = {
    task: {
        title: '',
        content: '',
        date: '2024-03-30',
        priority: 0,
        status: 0,
        tasksListId: -1,
    }
};


const taskForm = createSlice({
    name: "taskForm",
    initialState,
    reducers: {
        taskPropertyChange(state, action) {
            const {property, value} = action.payload;
            return {
                ...state,
                task: {
                    ...state.task,
                    [property]: value,
                },
            };
        },
        clearToInitial(state) {
            state.task = {...initialState.task};
        },
        setEditTask(state, action) {
            const task = action.payload;
            let {date, priority, status} = task;
            date = DateHelpers.formatDate(date);
            Object.keys(TaskPriority).forEach(key => {
                if (TaskPriority[parseInt(key)] === priority) priority = key;
            })
            Object.keys(TaskStatus).forEach(key => {
                if (TaskStatus[parseInt(key)] === status) status = key;
            })
            state.task = {...task, date, priority, status}
        }
    },
});

export const taskFormActions = taskForm.actions;
export default taskForm.reducer;