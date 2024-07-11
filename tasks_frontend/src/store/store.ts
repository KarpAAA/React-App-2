import {configureStore} from "@reduxjs/toolkit";
import {taskApi} from "./apis/task.api";
import {setupListeners} from "@reduxjs/toolkit/query";
import uiSlice from "./slices/ui.slice";
import errorSlice from "./slices/error.slice";
import modalWindowSlice from "./slices/modal.slice";

export const store = configureStore({
    reducer: {
        [taskApi.reducerPath]: taskApi.reducer,
        ui: uiSlice,
        error: errorSlice,
        modal: modalWindowSlice,
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
            error: errorSlice,
        },

        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(taskApi.middleware),
    })
    return store;
}
