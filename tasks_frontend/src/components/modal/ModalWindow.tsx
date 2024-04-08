import {Route, Routes} from "react-router-dom";
import {TaskDetailed} from "./TaskDetailed";
import {useEffect, useRef, useState} from "react";
import {TaskAddForm} from "./TaskAddForm";
import {TaskListAddForm} from "./TaskListAddForm";
import {BoardAddForm} from "./BoardAddForm";


export const ModalWindow = () => {
    const modalRef = useRef(null);
    const [modalContainer, setModalContainer] = useState(null)
    useEffect(() => {
        setModalContainer(modalRef.current)
    }, [modalRef]);


    return (
        <div className={"fixed rounded-full h-full w-full"} ref={modalRef}>

            <Routes>
                <Route path={'task/:id'} element={<TaskDetailed modalContainer={modalContainer}/>}></Route>
                <Route path={'task/edit'} element={<TaskAddForm modalContainer={modalContainer} edit={true}/>}></Route>
                <Route path={'task/create'} element={<TaskAddForm modalContainer={modalContainer} />}></Route>

                <Route path={'task-list/edit'} element={<TaskListAddForm modalContainer={modalContainer} edit={true}/>}></Route>
                <Route path={'task-list/create'} element={<TaskListAddForm modalContainer={modalContainer} />}></Route>

                <Route path={'board/create'} element={<BoardAddForm modalContainer={modalContainer} />}></Route>
            </Routes>
        </div>
    );
}