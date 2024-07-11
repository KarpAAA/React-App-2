import {BaseQueryFn, EndpointBuilder, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta} from "@reduxjs/toolkit/query";
import {CreateTaskListDTO} from "../../../types/dto/create.task.list.dto";
import {UpdateOrderTaskListDTO} from "../../../types/dto/update.order.task.list.dto";

const TaskListEndpoints = () => (builder:
                                 EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "History" | "Task" | "Board", "taskApi">) => {

   return {
       createTaskList: builder.mutation<any, CreateTaskListDTO>({
           query: (newTaskList) => ({
               url: '/tasks-list',
               method: 'POST',
               body: newTaskList,
           }),
           invalidatesTags: ["Task", "Board"]
       }),
       editTaskList: builder.mutation<any, CreateTaskListDTO>({
           query: (taskList) => ({
               url: `/tasks-list/${taskList.id}`,
               method: 'PATCH',
               body: taskList,
           }),
           invalidatesTags: ["Task", "Board"]
       }),

       editOrderTaskList: builder.mutation<any, UpdateOrderTaskListDTO>({
           query: (taskList) => ({
               url: `/tasks-list/order/${taskList.id}`,
               method: 'PATCH',
               body: taskList,
           }),
           invalidatesTags: ["Task", "Board"]
       }),
       deleteTaskList: builder.mutation<any, number>({
           query: (id) => ({
               url: `/tasks-list/${id}`,
               method: 'DELETE'
           }),
           invalidatesTags: ["Task", "Board"]
       }),
   }

}

export default TaskListEndpoints();