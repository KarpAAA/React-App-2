import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {History} from "./components/History";
import React from "react";
import {ModalWindow} from "./components/modal/ModalWindow";
import {uiActions} from "./store/slices/ui.slice";
import {ErrorContainer} from "./components/other/ErrorContainer";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {Board} from "./components/Board";
import {faTrello} from "@fortawesome/free-brands-svg-icons";
import Button from "./components/other/Button";


function App() {
    const navigate = useNavigate();
    const dispatcher = useAppDispatch();
    const {modalOpenState, historyOpenState, selectedBoardId} = useAppSelector(state => state.ui);
    const {isError} = useAppSelector(state => state.error);


    const handleCreateTasksList = () => {
        navigate('task-list/create');
        dispatcher(uiActions.setModalOpenState(true));
    }
    const handleCreateBoard = () => {
        navigate('board/create');
        dispatcher(uiActions.setModalOpenState(true));
    }

    const handleHistoryClicked = () => {
        dispatcher(uiActions.setHistoryOpenState(true));
    }

    return (

        <div>
            <div
                style={{background: 'linear-gradient(to right, #4188A7, #D9ECDB'}}
                className={"flex flex-row justify-between pl-3 py-2 align-middle"}>
                <div id={'header-title'} className={"font-bold text-2xl text-center text-white"}>
                    <FontAwesomeIcon className={'mr-2'} icon={faTrello}></FontAwesomeIcon>
                    Trello
                </div>

                <div id={'options'} className={'flex align-middle'}>
                    <Button
                        onClick={handleHistoryClicked}
                    >
                        <FontAwesomeIcon className={'px-1'} icon={fas.faArrowRotateLeft}/>
                        History
                    </Button>
                    {selectedBoardId
                        &&
                        <Button
                        onClick={handleCreateTasksList}
                    >
                        <FontAwesomeIcon className={'px-1'} icon={fas.faPlus}/>
                        Create new list
                    </Button>}


                    <Button
                        onClick={handleCreateBoard}
                    >
                        <FontAwesomeIcon className={'px-1'} icon={fas.faPlus}/>
                        Create new board
                    </Button>


                </div>
            </div>

            <div
                style={{background: 'linear-gradient(0.38turn, #3f87a6, #ebf8e1, #F0CE94)', minHeight: '100vh'}}
                className={'px-3'}
            >
                <div>
                    <Board></Board>
                </div>

            </div>
            {
                historyOpenState && <History></History>
            }

            {
                modalOpenState && <ModalWindow/>
            }
            {
                isError && <ErrorContainer></ErrorContainer>
            }

        </div>
    );
}

export default App;
