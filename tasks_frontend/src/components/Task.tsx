import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {OptionsMenu} from "./OptionsMenu";
import React, {FC, useState} from "react";
import {useDeleteTaskMutation} from "../store/apis/task.api";
import {useAppDispatch} from "../hooks/redux-ts.hooks";
import {Task as T} from "../types/task";
import {faClock} from "@fortawesome/free-regular-svg-icons/faClock";
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons/faPenToSquare";
import {faChartBar} from "@fortawesome/free-regular-svg-icons/faChartBar";
import {Constants} from "../utils/helpers/constants";
import {TaskStatus} from "../types/task.status";
import dateHelpers from "../utils/helpers/date.helpers";
import {modalWindowAction} from "../store/slices/modal.slice";

type TaskProps = {
    task: T
}

export const Task: FC<TaskProps> = ({task}) => {
    const dispatcher = useAppDispatch();
    const [optionsSelected, setOptionsSelected] = useState(false);

    const [deleteTask] = useDeleteTaskMutation();

    const openModalWindow = () => {
        dispatcher(modalWindowAction.setModalVisible(true))
    }
    const handleTaskEdit = () => {
        openModalWindow();
        dispatcher(modalWindowAction.setModalContent({contentType: 'TaskAddForm', contentProps: {task, edit: true}}))
    }
    const handleTaskDelete = (e: any) => {
        e.stopPropagation();
        deleteTask(task.id);
        setOptionsSelected(false);
    }
    const handleTaskClicked = () => {
        openModalWindow();
        dispatcher(modalWindowAction.setModalContent({contentType: 'TaskDetailed', contentProps: {id: task.id}}))
    }

    const options = [
        {
            value: "Edit",
            icon: fas.faEdit,
            iconColor: 'gray-500',
            event: handleTaskEdit
        },
        {
            value: "Delete",
            icon: fas.faTrash,
            iconColor: 'red-500',
            event: handleTaskDelete
        }
    ]
    const handleTaskOnDrag = (taskId: number) => (e: React.DragEvent) => {
        e.stopPropagation();
        e.dataTransfer.setData('taskId', taskId.toString());
    }

    const lastTaskEditedTime = task.history[task.history.length - 1]?.dateTime;
    const contentWithLimitChars  = task.content.length > Constants.maxTaskChars ?
            task.content.slice(0, Constants.maxTaskChars) + "..." : task.content;

    return (
        <div
            data-testid="task"
            draggable
            onDragStart={handleTaskOnDrag(task.id)}
            className={'' +
                'flex flex-col mb-3 p-5 w-full rounded bg-white shadow-xl' +
                'hover:cursor-grab'
            }>

            <div className={'flex flex-row'}>
                <div
                    style={{backgroundColor: `${Constants.TaskPriorityStyle[task.priority]}`}}
                    className={`p-2 w-1/4 mr-2 rounded`}></div>
                <div
                    style={{backgroundColor: `${Constants.TaskStatusStyle[task.status]}`}}
                    className={'p-2 w-1/4 rounded'}></div>
            </div>
            <div className={'flex flex-row justify-between font-medium text-lg my-2'}>
                <div onClick={handleTaskClicked} className={'break-all'}>{task.title}</div>
            </div>
            <div data-testid="task-content" className={'text-black text-sm mb-3 break-words'}>
                {contentWithLimitChars}
            </div>

            <div className={'flex flex-row gap-3 text-center items-center'}>
                <div
                    onMouseEnter={() => setOptionsSelected(true)}
                    onMouseLeave={() => setOptionsSelected(false)}
                    className={'cursor-pointer relative '}
                >
                    <FontAwesomeIcon
                        style={{color: '#7F8A9D'}}
                        icon={faChartBar}/>

                    <OptionsMenu
                        show={optionsSelected}
                        options={options} right={true}/>
                </div>

                <div
                    className={`text-sm ${task.status === TaskStatus.DONE ? 'bg-green-500 text-white px-2 py-1 rounded' : ''}`}>
                    <FontAwesomeIcon style={{color: `${task.status === TaskStatus.DONE ? '' : '#7F8A9D'}`}}
                                     icon={faClock} className={"mr-1"}/>
                    {task.date}
                </div>

                {
                    lastTaskEditedTime
                    &&
                    <div
                        className={`text-sm`}>
                        <FontAwesomeIcon
                            style={{color: '#7F8A9D'}}
                            icon={faPenToSquare} className={"mr-1"}/>
                        {dateHelpers.timeAgo(lastTaskEditedTime)}
                    </div>
                }
            </div>

        </div>

    );
}