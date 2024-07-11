import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {History} from "./components/History";
import React from "react";
import {ModalWindow} from "./components/modal/ModalWindow";
import {uiActions} from "./store/slices/ui.slice";
import {ErrorContainer} from "./components/other/ErrorContainer";
import {useAppDispatch, useAppSelector} from "./hooks/redux-ts.hooks";
import {Board} from "./components/Board";
import {faTrello} from "@fortawesome/free-brands-svg-icons";
import Button from "./components/other/Button";
import {modalWindowAction} from "./store/slices/modal.slice";


function App() {
    const dispatcher = useAppDispatch();
    const {visible: modalVisible} = useAppSelector(state => state.modal);
    const {historyOpenState, selectedBoardId} = useAppSelector(state => state.ui);
    const {isError} = useAppSelector(state => state.error);

    const openModalWindow = () => {
        dispatcher(modalWindowAction.setModalVisible(true));
    }
    const handleCreateTasksList = () => {
        openModalWindow();
        dispatcher(modalWindowAction.setModalContent({contentType: "TaskListAddForm", contentProps: {}}))
    }
    const handleCreateBoard = () => {
        openModalWindow();
        dispatcher(modalWindowAction.setModalContent({contentType: "BoardAddForm", contentProps: {}}))
    }

    const handleHistoryClicked = () => {
        dispatcher(uiActions.setHistoryOpenState(true));
    }



    return (

        <div>

            <div
                style={{background: 'linear-gradient(to right, #4188A7, #D9ECDB'}}
                className={"flex flex-row justify-between px-3 py-2 align-middle"}>
                <div id={'header-title'} className={"font-bold text-2xl text-center text-white"}>
                    <FontAwesomeIcon className={'mr-2'} icon={faTrello}></FontAwesomeIcon>
                    Trello
                </div>

                <div id={'options'} className={'flex gap-3 align-middle'}>
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
                modalVisible && <ModalWindow/>
            }
            {
                isError && <ErrorContainer></ErrorContainer>
            }

        </div>
    );
}

export default App;
