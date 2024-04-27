import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {OptionsMenu} from "./OptionsMenu";
import React, {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {uiActions} from "../store/slices/ui.slice";
import {useDeleteTaskMutation} from "../store/apis/task.api";
import {taskFormActions} from "../store/slices/task.form.slice";
import {useAppDispatch} from "../app/hooks";
import {Task as T} from "../types/task";
import {faClock} from "@fortawesome/free-regular-svg-icons/faClock";
import {faChartBar} from "@fortawesome/free-regular-svg-icons/faChartBar";
import {Constants} from "../utils/helpers/constants";

type TaskProps = {
    task: T
}


export const Task: FC<TaskProps> = ({task}) => {
    const dispatcher = useAppDispatch();
    const navigate = useNavigate();
    const [optionsSelected, setOptionsSelected] = useState(false);
    const [deleteTask] = useDeleteTaskMutation();

    const handleTaskEdit = () => {
        dispatcher(taskFormActions.setEditTask(task))
        dispatcher(uiActions.setModalOpenState(true));
        navigate('task/edit');
    }
    const handleTaskDelete = (e:any) => {
        e.stopPropagation();
        deleteTask(task.id);
        setOptionsSelected(false);
    }
    const handleTaskClicked = () => {
        dispatcher(uiActions.setModalOpenState(true));
        navigate(`/task/${task.id}`)
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
    const handleOnDrag = (taskId: number) => (e: React.DragEvent) => {
        e.stopPropagation();
        e.dataTransfer.setData('taskId', taskId.toString());
    }

    const contentWithLimitChars = task.content.length > Constants.maxTaskChars ?
        task.content.slice(0, Constants.maxTaskChars) + "..." : task.content
    return (
            <div
                data-testid="task"
                draggable
                onDragStart={handleOnDrag(task.id)}
                className={'' +
                    'flex flex-col mb-3 p-5 w-full rounded bg-white shadow-xl ' +
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

                <div className={'flex flex-row text-center items-center'}>
                    <div className={'cursor-pointer relative mr-3'}
                         onMouseEnter={() => setOptionsSelected(true)}
                         onMouseLeave={() => setOptionsSelected(false)}
                    >

                        <FontAwesomeIcon style={{color: '#7F8A9D'}} icon={faChartBar}/>
                        {optionsSelected &&
                            <OptionsMenu options={options} right={true}></OptionsMenu>
                        }
                    </div>

                    <div
                        className={`${task.status === "DONE" ? 'bg-green-500 text-white px-2 py-1 rounded' : ''}`}>
                        <FontAwesomeIcon style={{color: `${task.status === "DONE" ? '' : '#7F8A9D'}`}}
                                         icon={faClock} className={"mr-1"}/>
                        {task.date}
                    </div>
                </div>

            </div>

    );
}