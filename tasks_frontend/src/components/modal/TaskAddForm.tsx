import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {uiActions} from "../../store/slices/ui.slice";
import {taskFormActions} from "../../store/slices/task.form.slice";
import React, {ChangeEvent} from "react";
import {useCreateTaskMutation,useEditTaskMutation} from "../../store/apis/task.api";
import {setErrorAction} from "../../store/slices/error.slice";
import {RootState} from "../../store/store";
import {useAppDispatch} from "../../app/hooks";
import {TaskPriority} from "../../types/task.priority";
import {TaskStatus} from "../../types/task.status";

type TaskAddFormProps = {
    modalContainer: HTMLElement | null
    edit?: boolean
}
export const TaskAddForm: React.FC<TaskAddFormProps> = ({modalContainer, edit} ) => {
    const dispatcher = useAppDispatch();
    const {task} = useSelector((state: RootState) => state.taskForm);

    const [createTask] = useCreateTaskMutation();
    const [editTask] = useEditTaskMutation();


    if (modalContainer) {
        modalContainer.style.left = '30%';
        modalContainer.style.top = '10%';
    }
    const handleInputChange = (property: string) =>
        (e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        dispatcher(taskFormActions.taskPropertyChange({property, value: e.target.value}));
    }
    const handleModalClose = () => {
        dispatcher(taskFormActions.clearToInitial());
        dispatcher(uiActions.setModalOpenState(false));
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(edit){
                await editTask(task).unwrap();
            }
            else await createTask(task).unwrap();
        }
        catch (e: any) {
            dispatcher(setErrorAction({message: e.data.message, mills: 5000}))
        }
        handleModalClose();
    }
    return (
        <div
            style={{left: '10%', top: "10%", background: "linear-gradient(0.38turn, #EBECF0, #EBECF0)", color: "black"}}
            className={"w-2/5 h-4/5"}>
            <div
                style={{background: '#4289A7'}}
                onClick={handleModalClose}
                className={'flex justify-end text-white text-3xl px-5 py-2 -full rounded-t'}>
                <FontAwesomeIcon icon={fas.faXmark}/>
            </div>

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
                        <div className={'flex flex-col'} >
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
                    <button className={'rounded bg-green-700 text-white text-lg w-1/5 py-2  mt-2'}>Save</button>

                </form>


            </div>


        </div>
    );
}