import React, {ChangeEvent, FormEvent, useState} from "react";
import {useCreateTaskListMutation, useEditTaskListMutation,} from "../../store/apis/task.api";
import {setErrorAction} from "../../store/slices/error.slice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-ts.hooks";
import {TaskList} from "../../types/task.list";
import {modalWindowAction} from "../../store/slices/modal.slice";
import ObjectHelpers from "../../utils/helpers/object.helpers";


type TaskListAddFormProps = {
    taskList?: TaskList
    edit?: boolean
}

export const TaskListAddForm: React.FC<TaskListAddFormProps> = ({taskList: taskListToEdit, edit}) => {
    const dispatcher = useAppDispatch();

    const [taskList, setTaskList] = useState<TaskList>(
        taskListToEdit ? ObjectHelpers.deepObjectCopy(taskListToEdit) : {title: ''}
    );

    const {selectedBoardId} = useAppSelector(state => state.ui);

    const [createTaskList] = useCreateTaskListMutation();
    const [editTaskList] = useEditTaskListMutation();

    const closeModal = () => {
        dispatcher(modalWindowAction.resetModal());
    }

    const handleInputChange = (property: string) => (
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setTaskList((prevState) => ({...prevState, [property]: e.target.value}));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTaskList =
            {...taskList, boardId: selectedBoardId ? selectedBoardId : -1};
        try {
            if (edit) {
                await editTaskList(newTaskList).unwrap();
            } else await createTaskList(newTaskList).unwrap();
        } catch (e: any) {
            dispatcher(setErrorAction({message: e.data.message, mills: 5000}))
        }
        closeModal();
    }


    return (
        <div className={'flex flex-col items-center mt-5'}>
            <div className={' text-3xl my-3'}>{edit ? 'Edit' : 'Add'} task list</div>
            <form className={'flex flex-col justify-center items-center'} onSubmit={handleSubmit}>
                <div className="mx-10 flex flex-row justify-center">
                    <div className={'flex flex-col'}>
                        <label htmlFor="title" className=" text-lg  mr-5 my-2 py-1">Title:</label>
                    </div>
                    <div className={'flex flex-col'}>
                        <input
                            className="pl-5 py-1 text-lg rounded my-2"
                            value={taskList.title}
                            onChange={handleInputChange('title')}
                            required={true}
                        />
                    </div>
                </div>
                <button
                    type='submit'
                    className={'rounded bg-green-600 text-white text-lg w-1/5 py-2  mt-2'}>Save
                </button>
            </form>
        </div>
    );
}