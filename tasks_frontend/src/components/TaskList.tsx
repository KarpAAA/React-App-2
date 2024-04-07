import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {Task} from "./Task";
import React, {FC, useState} from "react";
import {OptionsMenu} from "./OptionsMenu";
import {
    useDeleteTaskListMutation, useEditOrderTaskListMutation, useMoveTaskMutation
} from "../store/apis/task.api";
import {useNavigate} from "react-router-dom";
import {uiActions} from "../store/slices/ui.slice";
import {taskFormActions} from "../store/slices/task.form.slice";
import {setErrorAction} from "../store/slices/error.slice";
import {taskListFormActions} from "../store/slices/task.list.form.slice";
import {useAppDispatch} from "../app/hooks";
import {TaskList as TL} from "../types/task.list";

type TaskListProps = {
    list: TL
}
export const TaskList: FC<TaskListProps> = ({list}) => {
    const navigate = useNavigate();
    const dispatcher = useAppDispatch();
    const [optionsSelected, setOptionsSelected] = useState(false);
    const [taskListDelete] = useDeleteTaskListMutation();
    const [moveTask] = useMoveTaskMutation();
    const [editTaskListOrder] = useEditOrderTaskListMutation();
    const handleAddNewCard = () => {
        dispatcher(taskFormActions.taskPropertyChange({
            property: 'tasksListId',
            value: list.id
        }))
        dispatcher(uiActions.setModalOpenState(true));
        navigate('task/create');
    }

    const handleTaskListEdit = () => {
        navigate('task-list/edit');
        dispatcher(taskListFormActions.setEditTaskList(list))
        dispatcher(uiActions.setModalOpenState(true));
    }

    const handleTaskListDelete = async () => {
        try {
            await taskListDelete(list.id).unwrap();
            setOptionsSelected(false);
        } catch (e: any) {
            dispatcher(setErrorAction({message: e.data.message, mills: 5000}))
        }
    }


    const options = [
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

        if(listId) {
            editTaskListOrder({id: +listId, order: list.id});
        }
        else if(taskId) {
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

    return (
        <div
            draggable
            onDragStart={handleOnDrag(list.id)}
            onDrop={handleOnDrop}
            onDragOver={handleDragOver}
            style={{background: "linear-gradient(0.38turn, #EBECF0, #EBECF0)"}}
            className={'hover:cursor-grab box-border rounded w-[calc(25%-1rem)] h-fit mx-2 flex flex-col flex-shrink-0 p-3'}>
            <div id={'list-options'}
                 className={'py-3 flex flex-row justify-between font-medium  text-lg'}>
                <div id={'list-name'}>{list.title}</div>

                <div id={'list-options-operations'} className={'flex flex-row'}>
                    <div
                        onMouseEnter={() => setOptionsSelected(true)}
                        onMouseLeave={() => setOptionsSelected(false)}
                        className={'cursor-pointer relative'}
                    >
                        <FontAwesomeIcon style={{color: '#7F8A9D'}} className={'px-1 font-normal'}
                                         icon={fas.faEllipsis}/>
                        {optionsSelected &&
                            <OptionsMenu options={options}></OptionsMenu>
                        }
                    </div>

                </div>

            </div>


            {list.tasks && list.tasks.map(task => (
                <Task key={task.id} task={task}></Task>
            ))}

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