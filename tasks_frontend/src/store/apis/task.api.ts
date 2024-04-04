import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Operation} from "../../types/operation";
import {TaskList} from "../../types/task.list";
import {Task} from "../../types/task";
import {CreateTaskListDTO} from "../../types/dto/create.task.list.dto";
import {CreateTaskDto} from "../../types/dto/create.task.dto";
import {MoveTaskDto} from "../../types/dto/move.task.dto";


export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
    tagTypes: ["Task", "History"],
    endpoints: (builder) => ({

        getTaskById: builder.query<Task, number>({
            query: (id) => `/tasks/${id}`,
            providesTags: ["History"]
        }),
        getAllTasks: builder.query<Task[], void>({
            query: () => '/tasks',
        }),
        createTask: builder.mutation<any, CreateTaskDto>({
            query: (newTask) => ({
                url: '/tasks',
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: ["Task", "History"],
        }),
        editTask: builder.mutation<any, CreateTaskDto>({
            query: (newTask) => ({
                url: `/tasks/${newTask.id}`,
                method: 'PATCH',
                body: newTask
            }),
            invalidatesTags: ["Task", "History"]
        }),

        moveTask: builder.mutation<any, MoveTaskDto>({
            query: (newTask) => ({
                url: `/tasks/${newTask.id}`,
                method: 'PATCH',
                body: newTask
            }),
            invalidatesTags: ["Task", "History"]
        }),

        deleteTask: builder.mutation<any, number>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Task", "History"]
        }),
        createTaskList: builder.mutation<any, CreateTaskListDTO>({
            query: (newTaskList) => ({
                url: '/tasks-list',
                method: 'POST',
                body: newTaskList,
            }),
            invalidatesTags: ["Task"]
        }),
        editTaskList: builder.mutation<any, CreateTaskListDTO>({
            query: (taskList) => ({
                url: `/tasks-list/${taskList.id}`,
                method: 'PATCH',
                body: taskList,
            }),
            invalidatesTags: ["Task"]
        }),
        deleteTaskList: builder.mutation<any, number>({
            query: (id) => ({
                url: `/tasks-list/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Task"]
        }),
        getAllTasksLists: builder.query<TaskList[], void>({
            query: () => '/tasks-list',
            providesTags: ["Task"]
        }),


        getAllHistory: builder.query<Operation[], void>({
            query: () => '/history',
            providesTags: ["History"]
        }),
    }),
})

export const {
    useGetAllTasksListsQuery,  useEditTaskListMutation, useDeleteTaskListMutation, useCreateTaskListMutation,
    useGetTaskByIdQuery, useCreateTaskMutation, useDeleteTaskMutation, useEditTaskMutation,useMoveTaskMutation,
    useGetAllHistoryQuery} = taskApi
