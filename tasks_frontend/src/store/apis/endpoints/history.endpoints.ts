import {BaseQueryFn, EndpointBuilder, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta} from "@reduxjs/toolkit/query";
import {Operation} from "../../../types/operation";

const HistoryEndpoints = () => (builder:
                                 EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "History" | "Task" | "Board", "taskApi">) => {

    return {
        getAllHistory: builder.query<Operation[], number>({
            query: (boardId) => `/history/${boardId}`,
            providesTags: ["History"]
        }),
    }

}

export default HistoryEndpoints();