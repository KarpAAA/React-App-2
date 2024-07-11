import React, {FC, useEffect, useRef, useState} from "react";
import {TaskList} from "./TaskList";
import {
    useDeleteBoardMutation,
    useEditBoardMutation,
    useGetAllBoardsQuery,
    useGetBoardByIdQuery
} from "../store/apis/task.api";
import {useAppDispatch, useAppSelector} from "../hooks/redux-ts.hooks";
import {uiActions} from "../store/slices/ui.slice";
import Button from "./other/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {EditableInput} from "./other/EditableInput";
import IconButton from "./other/IconButton";
import {Board as BoardType} from "../types/board";
import {useEdgeScrolling} from "../hooks/useEdgeScrolling";
import {useScrollBy} from "../hooks/useScrollBy";


type BoardProps = {}
export const Board: FC<BoardProps> = () => {
    const dispatcher = useAppDispatch();
    const [isEditable, setIsEditable] = useState(false);
    const [boardEditState, setBoardEditState] = useState<BoardType | null>(null);

    const boardContainerRef = useRef<HTMLDivElement>(null);
    const {handleScrollRight,handleScrollLeft} = useScrollBy(boardContainerRef);
    const {startScrolling, stopScrolling} = useEdgeScrolling(boardContainerRef);

    const {selectedBoardId} = useAppSelector(state => state.ui);
    const {data: boards} = useGetAllBoardsQuery();
    const {data: board} = useGetBoardByIdQuery(selectedBoardId, {
        skip: !selectedBoardId
    });

    useEffect(() => {
        if (board) {
            setBoardEditState({...board})
        }
    }, [board]);

    const [editBoard] = useEditBoardMutation();
    const [deleteBoard] = useDeleteBoardMutation();

    useEffect(() => {
        if (boards && boards.length > 0 && !selectedBoardId) {
            dispatcher(uiActions.setSelectedBoard(boards[0].id))
        }
    }, [boards, dispatcher, selectedBoardId]);


    const handleSelectedBoardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (boards) {
            dispatcher(uiActions.setSelectedBoard(e.target.value));
        }
    }
    const handleBoardEdit = async () => {
        await editBoard({...boardEditState, id: board?.id});
        setIsEditable(false);
    }
    const handleBoardEditStart = () => {
        setIsEditable(true);
    }
    const handleBoardDelete = () => {
        dispatcher(uiActions.setSelectedBoardIdToInitial());
        deleteBoard({id: board?.id!});
    }

    return (
        <div>
            <div
                className="absolute left-0 top-0 bottom-0 w-8 cursor-pointer"
                onDragOver={() => startScrolling("left")}
                onDragLeave={stopScrolling}
            ></div>
            <div
                className="absolute right-0 top-0 bottom-0 w-8 cursor-pointer"
                onDragOver={() => startScrolling("right")}
                onDragLeave={stopScrolling}
            ></div>

            {boards && boards.length > 0 && selectedBoardId &&
                <div className={'flex flex-row justify-between py-4'}>
                    <div className={'flex flex-row'}>

                        <select
                            style={{backgroundColor: '#4188A7'}}
                            className={'border-none rounded bg-gray-600 text-white text-lg px-3 py-1'}
                            onChange={handleSelectedBoardChange}
                            value={selectedBoardId}
                        >
                            {boards && boards.map((board) => (
                                <option className={'text-lg'} key={board.id} value={board.id}>{board.title}</option>
                            ))}
                        </select>


                        <div id={'header-title'}
                             className={"flex flex-row ml-3 gap-3 font-bold text-white text-2xl"}>
                            <EditableInput
                                initialValue={board?.title!}
                                value={boardEditState?.title || ''}
                                isEditable={isEditable}
                                handleSave={handleBoardEdit}
                                handleChange={(e) => {
                                    setBoardEditState((prev) => {
                                        if (prev) {
                                            return {...prev, title: e.target.value};
                                        }
                                        return prev;
                                    })
                                }}
                            />
                            {!isEditable &&
                                <IconButton
                                    onClick={handleBoardEditStart}
                                >
                                    <FontAwesomeIcon icon={fas.faEdit}></FontAwesomeIcon>
                                </IconButton>
                            }
                            <IconButton
                                onClick={handleBoardDelete}>
                                <FontAwesomeIcon icon={fas.faTrash}></FontAwesomeIcon>
                            </IconButton>
                        </div>

                    </div>


                    <div className={'flex gap-3'}>
                        <Button
                            onClick={handleScrollLeft}>
                            <FontAwesomeIcon className={'px-1'} icon={fas.faArrowLeft}/>
                            Left
                        </Button>
                        <Button
                            onClick={handleScrollRight}>
                            Right
                            <FontAwesomeIcon className={'px-1'} icon={fas.faArrowRight}/>
                        </Button>
                    </div>


                </div>
            }

            {board && selectedBoardId && boards && boards.length > 0 &&
                <div id={"tasks-lists"}
                     ref={boardContainerRef}
                     className={'flex gap-3 overflow-x-auto min-h-60'}>
                    {board.tasksLists && board.tasksLists.map(list =>
                        <div
                            className={'flex-shrink-0' +
                                ' w-full 2xl:w-1/4 xl:w-1/4 lg:w-1/3 md:w-1/3 sm:w-1/2 xs:w-1/2'}
                            key={list.id}>
                            <TaskList list={list}></TaskList>
                        </div>
                    )}
                </div>
            }
        </div>
    );
}