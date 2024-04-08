import {configureStore} from "@reduxjs/toolkit";
import {taskApi} from "./apis/task.api";
import {setupListeners} from "@reduxjs/toolkit/query";
import uiSlice from "./slices/ui.slice";
import taskFormSlice from "./slices/task.form.slice";
import errorSlice from "./slices/error.slice";
import taskListFormSlice from "./slices/task.list.form.slice";
import boardFormSlice from "./slices/board.form.slice";

export const store = configureStore({
    reducer: {
        [taskApi.reducerPath]: taskApi.reducer,
        ui: uiSlice,
        taskForm: taskFormSlice,
        error: errorSlice,
        taskListForm: taskListFormSlice,
        board: boardFormSlice,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(taskApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export function createTestStore() {
    const store = configureStore({
        reducer: {
            [taskApi.reducerPath]: taskApi.reducer,
            ui: uiSlice,
            taskForm: taskFormSlice,
            error: errorSlice,
            taskListForm: taskListFormSlice,
            board: boardFormSlice,
        },

        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(taskApi.middleware),
    })
    return store;
}
