import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {Task} from "./Task";
import React, {FC, useState} from "react";
import {OptionsMenu} from "./OptionsMenu";
import {useDeleteTaskListMutation, useEditOrderTaskListMutation, useMoveTaskMutation} from "../store/apis/task.api";
import {setErrorAction} from "../store/slices/error.slice";
import {useAppDispatch} from "../hooks/redux-ts.hooks";
import {TaskList as TL} from "../types/task.list";
import {modalWindowAction} from "../store/slices/modal.slice";
import {AnimatePresence, motion} from "framer-motion";

type TaskListProps = {
    list: TL
}
export const TaskList: FC<TaskListProps> = ({list}) => {
    const dispatcher = useAppDispatch();
    const [optionsSelected, setOptionsSelected] = useState(false);
    const [isAscending, setIsAscending] = useState(true);
    const [taskListDelete] = useDeleteTaskListMutation();
    const [moveTask] = useMoveTaskMutation();
    const [editTaskListOrder] = useEditOrderTaskListMutation();

    const openModalWindow = () => {
        dispatcher(modalWindowAction.setModalVisible(true))
    }

    const handleAddNewCard = () => {
        openModalWindow();
        dispatcher(modalWindowAction.setModalContent({contentType: 'TaskAddForm', contentProps: {listId: list.id}}))
    }

    const handleTaskListEdit = () => {
        openModalWindow();
        dispatcher(modalWindowAction.setModalContent({
            contentType: 'TaskListAddForm',
            contentProps: {taskList: list, edit: true}
        }))
    }

    const handleTaskListDelete = async () => {
        try {
            await taskListDelete(list.id).unwrap();
            setOptionsSelected(false);
        } catch (e: any) {
            dispatcher(setErrorAction({message: e.data.message, mills: 5000}))
        }
    }

    const handleSortingButtonClicked = () => {
        setIsAscending(!isAscending);
    }

    const optionMenuOptions = [
        {
            value: "Edit",
            icon: fas.faEdit,
            iconColor: 'gray-500',
            event: handleTaskListEdit
        },
        {
            value: "Add New Card",
            icon: fas.faPlus,
            iconColor: 'gray-500',
            event: handleAddNewCard
        }, {
            value: "Delete",
            icon: fas.faTrash,
            iconColor: 'red-500',
            event: handleTaskListDelete
        }
    ]
    const handleOnDrop = (e: React.DragEvent) => {
        const taskId = e.dataTransfer.getData("taskId") as string;
        const listId = e.dataTransfer.getData("listId") as string;

        if (listId) {
            editTaskListOrder({id: +listId, order: list.id});
        } else if (taskId) {
            moveTask({tasksListId: list.id, id: +taskId});
        }

    }
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    const handleOnDrag = (listId: number) => (e: React.DragEvent) => {
        e.stopPropagation();
        e.dataTransfer.setData('listId', listId.toString());
    }

    const sortedTasks = list.tasks.slice().sort(
        (a, b) => {
            if (isAscending) {
                return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
            } else {
                return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
            }
        }
    );

    return (
        <div
            draggable
            onDragStart={handleOnDrag(list.id)}
            onDrop={handleOnDrop}
            onDragOver={handleDragOver}
            style={{background: "linear-gradient(0.38turn, #EBECF0, #EBECF0)"}}
            className={'hover:cursor-grab box-border rounded flex flex-col p-3'}>
            <div id={'list-options'}
                 className={'py-3 flex flex-row justify-between font-medium text-lg'}>
                <div id={'list-name'}>
                    {list.title}
                </div>

                <div id={'list-options-operations'} className={'flex flex-row gap-3'}>
                    <button
                        onClick={handleSortingButtonClicked}
                        style={{transform: isAscending ? '' : 'rotate(180deg)'}}
                        className={`text-sm text-gray-700 transition-all duration-500`}>
                        <FontAwesomeIcon icon={fas.faArrowDown}/>
                    </button>

                    <div
                        onMouseEnter={() => setOptionsSelected(true)}
                        onMouseLeave={() => setOptionsSelected(false)}
                        className={'cursor-pointer relative'}
                    >
                        <FontAwesomeIcon
                            style={{color: '#7F8A9D'}} className={'px-1 font-normal'}
                            icon={fas.faEllipsis}/>
                        <OptionsMenu show={optionsSelected} options={optionMenuOptions}></OptionsMenu>
                    </div>

                </div>

            </div>
            <AnimatePresence>
                {list.tasks && sortedTasks.map(task => (
                    <motion.div
                        key={task.id}
                        layout
                        initial={{opacity: 0, x: -50}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 50}}
                        transition={{duration: 0.5}}
                    >
                        <Task key={task.id} task={task}></Task>
                    </motion.div>
                ))}
            </AnimatePresence>
            <div className={'ml-2'}>
                <button
                    onClick={handleAddNewCard}
                    className={'w-full text-md text-left text-gray-500'}
                >
                    <FontAwesomeIcon className={'pr-2'} icon={fas.faPlus}/>
                    Add new card

                </button>
            </div>
        </div>
    );
}