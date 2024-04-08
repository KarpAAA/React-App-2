import React, {FC, useEffect, useRef, useState} from "react";
import {TaskList} from "./TaskList";
import {
    useDeleteBoardMutation,
    useEditBoardMutation,
    useGetAllBoardsQuery,
    useGetBoardByIdQuery
} from "../store/apis/task.api";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {uiActions} from "../store/slices/ui.slice";
import Button from "./other/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {EditableInput} from "./other/EditableInput";
import {boardFormAction} from "../store/slices/board.form.slice";


type BoardProps = {}
export const Board: FC<BoardProps> = () => {
    const dispatcher = useAppDispatch();
    const [isEditable, setIsEditable] = useState(false);
    const boardContainerRef = useRef<HTMLDivElement>(null);

    const {board: boardState} = useAppSelector(state => state.board)
    const {selectedBoardId} = useAppSelector(state => state.ui);

    const {data: boards} = useGetAllBoardsQuery();
    const {data: board} = useGetBoardByIdQuery(selectedBoardId, {
        skip: !selectedBoardId
    });

    const [editBoard] = useEditBoardMutation();
    const [deleteBoard] = useDeleteBoardMutation();

    useEffect(() => {
        if (boards && boards.length > 0 && !selectedBoardId) {
            dispatcher(uiActions.setSelectedBoard(boards[0].id))
        }
    }, [boards, dispatcher, selectedBoardId]);
    useEffect(() => {
        dispatcher(boardFormAction.boardPropertyChange({
            property: "title",
            value: board?.title
        }))
    }, [board, dispatcher]);
    const handleSelectedBoardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (boards) {
            dispatcher(uiActions.setSelectedBoard(e.target.value));
        }
    }

    const handleScrollRight = () => {
        if (boardContainerRef && boardContainerRef.current) {
            boardContainerRef.current.scrollBy({
                left: boardContainerRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    };
    const handleScrollLeft = () => {
        if (boardContainerRef && boardContainerRef.current) {
            boardContainerRef.current.scrollBy({
                left: -boardContainerRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    };

    const handleBoardEdit = async () => {
        await editBoard({...boardState, id: board?.id});
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
                             className={"flex flex-row ml-3 font-bold text-white text-2xl"}>
                            <EditableInput
                                initialValue={board?.title!}
                                value={boardState.title}
                                isEditable={isEditable}
                                handleSave={handleBoardEdit}
                                handleChange={(e) => {
                                    dispatcher(boardFormAction.boardPropertyChange({
                                        property: "title",
                                        value: e.target.value
                                    }))
                                }}
                            />
                            {!isEditable &&
                                <button
                                    style={{color: "#4188A7"}}
                                    onClick={handleBoardEditStart}
                                    className={'border-none mx-4'}>
                                    <FontAwesomeIcon icon={fas.faEdit}></FontAwesomeIcon>
                                </button>}
                            <button
                                style={{color: "#4188A7"}}
                                onClick={handleBoardDelete}
                                className={'border-none'}>
                                <FontAwesomeIcon icon={fas.faTrash}></FontAwesomeIcon>
                            </button>
                        </div>

                    </div>


                    <div>
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
                     className={'flex flex-nowrap  overflow-x-auto w-100 min-h-60'}>
                    {board.tasksLists && board.tasksLists.map(list =>
                        <TaskList key={list.id} list={list}></TaskList>
                    )}
                </div>
            }
        </div>
    );
}