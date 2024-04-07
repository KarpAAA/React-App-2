import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {uiActions} from "../../store/slices/ui.slice";
import React, {ChangeEvent, FormEvent, useEffect} from "react";
import {useCreateBoardMutation} from "../../store/apis/task.api";
import {setErrorAction} from "../../store/slices/error.slice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {boardFormAction} from "../../store/slices/board.form.slice";


type BoardAddFormProps = {
    modalContainer: HTMLElement | null,
    edit?: boolean
}
export const BoardAddForm: React.FC<BoardAddFormProps> = ({modalContainer, edit}) => {
    const dispatcher = useAppDispatch();
    const {board} = useAppSelector(state => state.board);
    const [createBoardDTO] = useCreateBoardMutation();

    useEffect(() => {
        clearInputs();
    }, []);

    if (modalContainer) {
        modalContainer.style.left = '30%';
        modalContainer.style.top = '20%';
    }
    const handleInputChange = (property: string) => (
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatcher(boardFormAction.boardPropertyChange({property, value: e.target.value}));
    }
    const clearInputs = () => {
        dispatcher(boardFormAction.clearToInitial());
    }
    const handleModalClose = () => {
        clearInputs();
        dispatcher(uiActions.setModalOpenState(false));
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
        <div
            style={{left: '10%', top: "10%", background: "linear-gradient(0.38turn, #EBECF0, #EBECF0)", color: "black"}}
            className={"w-2/5 h-3/5 bg-gray-400"}>
            <div
                style={{background: '#4289A7'}}
                onClick={handleModalClose}
                className={'flex justify-end bg-blue-950 text-white text-3xl px-5 py-2 w-full rounded-t'}>
                <FontAwesomeIcon icon={fas.faXmark}/>
            </div>

            <div className={'flex flex-col items-center mt-10'}>
                <div className={' text-3xl my-3'}>{edit ? 'Edit' : 'Add'} board</div>
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


        </div>
    );
}