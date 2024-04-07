import {Task} from "../../../types/task";
import {CreateTaskDto} from "../../../types/dto/create.task.dto";
import {MoveTaskDto} from "../../../types/dto/move.task.dto";
import {BaseQueryFn, EndpointBuilder, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta} from "@reduxjs/toolkit/query";

const TaskEndpoints = () => (builder:
                                 EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "History" | "Task" | "Board", "taskApi">) => {

   return {
       getTaskById: builder.query<Task, number>({
           query: (id) => `/tasks/${id}`,
           providesTags: ["History"]
       }),

       createTask: builder.mutation<any, CreateTaskDto>({
           query: (newTask) => ({
               url: '/tasks',
               method: 'POST',
               body: newTask,
           }),
           invalidatesTags: ["Task", "History", "Board"],
       }),
       editTask: builder.mutation<any, CreateTaskDto>({
           query: (newTask) => ({
               url: `/tasks/${newTask.id}`,
               method: 'PATCH',
               body: newTask
           }),
           invalidatesTags: ["Task", "History", "Board"]
       }),

       moveTask: builder.mutation<any, MoveTaskDto>({
           query: (newTask) => ({
               url: `/tasks/${newTask.id}`,
               method: 'PATCH',
               body: newTask
           }),
           invalidatesTags: ["Task", "History", "Board"]
       }),

       deleteTask: builder.mutation<any, number>({
           query: (id) => ({
               url: `/tasks/${id}`,
               method: 'DELETE'
           }),
           invalidatesTags: ["Task", "History", "Board"]
       })
   }

}

export default TaskEndpoints();