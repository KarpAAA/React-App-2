import {BaseQueryFn, EndpointBuilder, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta} from "@reduxjs/toolkit/query";
import {Board} from "../../../types/board";
import {CreateBoardDTO} from "../../../types/dto/create.board.dto";

const BoardEndpoints = () => (builder:
                                 EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "History" | "Task" | "Board", "taskApi">) => {

    return {
        getBoardById: builder.query<Board, number | null>({
            query: (id) => `/board/${id}`,
            providesTags: ["Board"]
        }),
        getAllBoards: builder.query<Board[], void>({
            query: () => `/board`,
            providesTags: ["Board"]
        }),
        createBoard: builder.mutation<any, CreateBoardDTO>({
            query: (newBoard) => ({
                url: '/board',
                method: 'POST',
                body: newBoard,
            }),
            invalidatesTags: ["Board"]
        }),
        editBoard: builder.mutation<any, CreateBoardDTO>({
            query: (newBoard) => ({
                url: `/board/${newBoard.id}`,
                method: 'PATCH',
                body: newBoard,
            }),
            invalidatesTags: ["Board"]
        }),
        deleteBoard: builder.mutation<any, { id: number }>({
            query: ({id}) => ({
                url: `/board/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Board"]
        }),
    }

}

export default BoardEndpoints();