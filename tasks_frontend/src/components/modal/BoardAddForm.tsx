import {uiActions} from "../../store/slices/ui.slice";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useCreateBoardMutation} from "../../store/apis/task.api";
import {setErrorAction} from "../../store/slices/error.slice";
import {useAppDispatch} from "../../hooks/redux-ts.hooks";
import {modalWindowAction} from "../../store/slices/modal.slice";


export const BoardAddForm: React.FC = () => {
    const [board, setBoard] = useState({
        title: '',
    });
    const dispatcher = useAppDispatch();
    const [createBoardDTO] = useCreateBoardMutation();

    const handleModalClose = () => {
        dispatcher(modalWindowAction.resetModal());
    }

    const handleInputChange = (property: string) => (
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setBoard(prevState => ({...prevState, [property]: e.target.value}));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await createBoardDTO(board).unwrap();
            dispatcher(uiActions.setSelectedBoard(res.id));
        } catch (e: any) {
            dispatcher(setErrorAction({message: e.data.message, mills: 5000}))
        }
        handleModalClose();
    }


    return (
        <div className={'flex flex-col items-center mt-5'}>
            <div className={'text-3xl my-3'}>Add board</div>
            <form className={'flex flex-col justify-center items-center'} onSubmit={handleSubmit}>
                <div className="mx-10 flex flex-row justify-center">
                    <div className={'flex flex-col'}>
                        <label htmlFor="title" className=" text-lg  mr-5 my-2 py-1">Title:</label>
                    </div>
                    <div className={'flex flex-col'}>
                        <input
                            className="pl-5 py-1 text-lg rounded my-2"
                            value={board.title}
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