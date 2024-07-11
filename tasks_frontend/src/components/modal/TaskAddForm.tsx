import React, {ChangeEvent, useState} from "react";
import {useCreateTaskMutation, useEditTaskMutation} from "../../store/apis/task.api";
import {setErrorAction} from "../../store/slices/error.slice";
import {useAppDispatch} from "../../hooks/redux-ts.hooks";
import {TaskPriority} from "../../types/task.priority";
import {TaskStatus} from "../../types/task.status";
import {Task} from "../../types/task";
import {modalWindowAction} from "../../store/slices/modal.slice";
import ObjectHelpers from "../../utils/helpers/object.helpers";

type TaskAddFormProps = {
    listId?: number,
    task?: Task,
    edit?: boolean
}
const taskInitialState = {
    title: '',
    content: '',
    date: new Date().toISOString().slice(0, 10),
    priority: 0,
    status: 0,
    tasksListId: -1,
}

export const TaskAddForm: React.FC<TaskAddFormProps> = (
    {listId: tasksListId, task: taskToEdit, edit}
) => {
    const [task, setTask] = useState<Task>(
        taskToEdit ? ObjectHelpers.deepObjectCopy(taskToEdit) : {...taskInitialState, tasksListId});
    const dispatcher = useAppDispatch();

    const [createTask] = useCreateTaskMutation();
    const [editTask] = useEditTaskMutation();

    const handleInputChange = (property: string) =>
        (e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
            setTask(prev => ({...prev, [property]: e.target.value}))
        }

    const handleModalClose = () => {
        dispatcher(modalWindowAction.resetModal());
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(task);
        try {
            if (edit) {
                await editTask(task).unwrap();
            } else await createTask(task).unwrap();
        } catch (e: any) {
            dispatcher(setErrorAction({message: e.data.message, mills: 5000}))
        }
        handleModalClose();
    }

    return (

        <div className={'flex flex-col items-center'}>
            <div className={'text-3xl my-3'}>{edit ? 'Edit' : 'Add'} task</div>
            <form className={'flex flex-col justify-center items-center'} onSubmit={handleSubmit}>
                <div className="mx-10 flex flex-row justify-center">
                    <div className={'flex flex-col'}>
                        <label htmlFor="title" className=" text-lg  mr-5 my-2 py-1">Title:</label>
                        <label htmlFor="content" className=" text-lg mr-5 my-2 py-1">Due Date:</label>
                        <label htmlFor="priority" className=" text-lg mr-5 my-2 py-1">Priority:</label>
                        <label htmlFor="status" className=" text-lg  mr-5 my-2 py-1">Status:</label>
                        <label htmlFor="title" className=" text-lg  mr-5 my-2 py-1">Content:</label>
                    </div>
                    <div className={'flex flex-col'}>
                        <input
                            className="pl-5 py-1 text-lg rounded my-2"
                            value={task.title}
                            onChange={handleInputChange('title')}
                            required={true}
                        />


                        <input type={'date'}
                               className="pl-5 py-1 text-lg rounded my-2"
                               value={task.date}
                               onChange={handleInputChange('date')}
                               required={true}/>
                        <select
                            id="priority"
                            className="pl-5 py-1 text-lg rounded my-2"
                            value={task.priority}
                            onChange={handleInputChange('priority')}
                        >
                            {Object.keys(TaskPriority).map((key, index) => (
                                <option key={index} value={key}>{TaskPriority[parseInt(key)]}</option>
                            ))}

                        </select>
                        <select
                            id="priority"
                            className="pl-5 py-1 text-lg rounded my-2"
                            value={task.status}
                            onChange={handleInputChange('status')}
                        >
                            {Object.keys(TaskStatus).map((key, index) => (
                                <option key={index} value={key}>{TaskStatus[parseInt(key)]}</option>
                            ))}

                        </select>

                        <textarea
                            className="pl-5 py-1 text-md rounded my-2"
                            value={task.content}
                            onChange={handleInputChange('content')} rows={4} cols={30}
                            required={true}
                        />
                    </div>
                </div>
                <button className={'rounded bg-green-700 text-white text-lg w-1/5 py-2 mt-2'}>Save</button>

            </form>
        </div>
    );
}