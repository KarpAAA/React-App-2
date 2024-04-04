import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {uiActions} from "../../store/slices/ui.slice";
import React, {ChangeEvent, FormEvent} from "react";
import {
    useCreateTaskListMutation,
    useEditTaskListMutation,
} from "../../store/apis/task.api";
import {setErrorAction} from "../../store/slices/error.slice";
import {taskListFormActions} from "../../store/slices/task.list.form.slice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";


type TaskListAddFormProps = {
    modalContainer:  HTMLElement | null,
    edit?: boolean
}
export const TaskListAddForm: React.FC<TaskListAddFormProps> = ({modalContainer, edit}) => {
    const dispatcher = useAppDispatch();
    const {taskList} = useAppSelector(state => state.taskListForm);

    const [createTaskList] = useCreateTaskListMutation();
    const [editTaskList] = useEditTaskListMutation();

    if (modalContainer) {
        modalContainer.style.left = '30%';
        modalContainer.style.top = '20%';
    }
    const handleInputChange = (property: string) => (
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatcher(taskListFormActions.taskPropertyChange({property, value: e.target.value}));
    }
    const handleModalClose = () => {
        dispatcher(taskListFormActions.clearToInitial());
        dispatcher(uiActions.setModalOpenState(false));
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (edit) {
                await editTaskList(taskList).unwrap();
            } else await createTaskList(taskList).unwrap();
        } catch (e: any) {
            dispatcher(setErrorAction({message: e.data.message, mills: 5000}))
        }
        handleModalClose();
    }
    return (
        <div className={"w-2/5 h-3/5 bg-gray-400"} style={{left: '10%', top: "10%"}}>
            <div
                onClick={handleModalClose}
                className={'flex justify-end bg-blue-950 text-white text-3xl px-5 py-2 w-full rounded-t'}>
                <FontAwesomeIcon icon={fas.faXmark}/>
            </div>

            <div className={'flex flex-col items-center mt-10'}>
                <div className={'text-white text-3xl my-3'}>{edit ? 'Edit' : 'Add'} task</div>
                <form className={'flex flex-col justify-center items-center'} onSubmit={handleSubmit}>
                    <div className="mx-10 flex flex-row justify-center">
                        <div className={'flex flex-col'}>
                            <label htmlFor="title" className="text-white text-lg  mr-5 my-2 py-1">Title:</label>
                            <label htmlFor="content" className="text-white text-lg  mr-5 my-2 py-1">Number:</label>

                        </div>
                        <div className={'flex flex-col'}>
                            <input
                                className="bg-gray-600 text-white pl-5 py-1 text-lg rounded my-2"
                                value={taskList.title}
                                onChange={handleInputChange('title')}
                                required={true}
                            />


                            <input type={'number'}
                                   className="bg-gray-600 text-white pl-5 py-1 text-lg rounded my-2"
                                   value={taskList.number}
                                   onChange={handleInputChange('number')}
                                   required={true}
                            />

                        </div>
                    </div>
                    <button
                        type='submit'
                        className={'rounded bg-blue-950 text-lg w-1/5 py-2 text-white mt-2'}>Save
                    </button>
                </form>

            </div>


        </div>
    );
}