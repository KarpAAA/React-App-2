import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Operation} from "../../types/operation";
import {Task} from "../../types/task";
import {CreateTaskListDTO} from "../../types/dto/create.task.list.dto";
import {CreateTaskDto} from "../../types/dto/create.task.dto";
import {MoveTaskDto} from "../../types/dto/move.task.dto";
import {Board} from "../../types/board";
import {CreateBoardDTO} from "../../types/dto/create.board.dto";
import {UpdateOrderTaskListDTO} from "../../types/dto/update.order.task.list.dto";
import TaskEndpoints from "./endpoints/task.endpoints";
import TasksListEndpoints from "./endpoints/tasks-list.endpoints";
import HistoryEndpoints from "./endpoints/history.endpoints";
import BoardEndpoints from "./endpoints/board.endpoints";


export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
    tagTypes: ["Task", "History", "Board"],
    endpoints: (builder) => ({
        ...TaskEndpoints(builder),
        ...TasksListEndpoints(builder),
        ...HistoryEndpoints(builder),
        ...BoardEndpoints(builder)
    }),
})

export const {
    useDeleteBoardMutation, useGetBoardByIdQuery,useGetAllBoardsQuery, useCreateBoardMutation,  useEditBoardMutation,
    useEditOrderTaskListMutation,  useEditTaskListMutation, useDeleteTaskListMutation, useCreateTaskListMutation,
    useGetTaskByIdQuery, useCreateTaskMutation, useDeleteTaskMutation, useEditTaskMutation,useMoveTaskMutation,
    useGetAllHistoryQuery} = taskApi
