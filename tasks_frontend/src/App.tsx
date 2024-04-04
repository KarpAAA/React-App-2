import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {TaskList} from "./components/TaskList";
import {History} from "./components/History";
import React, {useRef} from "react";
import {ModalWindow} from "./components/modal/ModalWindow";
import {uiActions} from "./store/slices/ui.slice";
import {useGetAllTasksListsQuery} from "./store/apis/task.api";
import {ErrorContainer} from "./components/other/ErrorContainer";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./app/hooks";

function App() {
  const navigate = useNavigate();
  const dispatcher = useAppDispatch();
  const {modalOpenState, historyOpenState} = useAppSelector(state => state.ui);
  const {isError} = useAppSelector(state => state.error);
  const {data: tasksList} = useGetAllTasksListsQuery();

  const tasksListRef = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    if (tasksListRef.current) {
      tasksListRef.current.scrollBy({
        left: tasksListRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };
  const handleScrollLeft = () => {
    if (tasksListRef.current) {
      tasksListRef.current.scrollBy({
        left: -tasksListRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleCreateTasksList = () => {
    navigate('task-list/create');
    dispatcher(uiActions.setModalOpenState(true));
  }
  const handleHistoryClicked = () => {
    dispatcher(uiActions.setHistoryOpenState(true));
  }

  return (

      <div>
        <div className={"flex flex-row justify-between my-4 align-middle"}>
          <div id={'header-title'} className={"font-bold text-3xl text-center"}>
            My Task Board
          </div>

          <div id={'options'} className={'flex align-middle'}>
            <button
                className={"mr-5 text-black border-solid border-2 border-gray-500 rounded px-3 py-2"}
                onClick={handleScrollLeft}>
              <FontAwesomeIcon className={'px-1'} icon={fas.faArrowLeft}/>
              Left
            </button>
            <button
                className={"mr-5 text-black border-solid border-2 border-gray-500 rounded px-3 py-2"}
                onClick={handleScrollRight}>
              Right
              <FontAwesomeIcon className={'px-1'} icon={fas.faArrowRight}/>
            </button>
            <button
                className={"mr-5 text-black border-solid border-2 border-gray-500 rounded px-3 py-2"}
                onClick={handleHistoryClicked}
            >
              <FontAwesomeIcon className={'px-1'} icon={fas.faArrowRotateLeft}/>
              History
            </button>
            <button
                onClick={handleCreateTasksList}
                className={"mr-5 text-white bg-blue-950 rounded px-3 py-2"}
            >
              <FontAwesomeIcon className={'px-1'} icon={fas.faPlus}/>
              Create new list
            </button>
          </div>
        </div>

        <div id={"tasks-lists"} ref={tasksListRef}
             className={'flex flex-nowrap  overflow-x-auto w-100 min-h-60'}>
          {tasksList && tasksList.map(list =>
              <TaskList key={list.id} list={list}></TaskList>
          )}

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
