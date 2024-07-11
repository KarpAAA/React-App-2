import {TaskDetailed} from "./TaskDetailed";
import {TaskAddForm} from "./TaskAddForm";
import {TaskListAddForm} from "./TaskListAddForm";
import {BoardAddForm} from "./BoardAddForm";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-ts.hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {modalWindowAction} from "../../store/slices/modal.slice";
import {AnimatePresence, motion} from "framer-motion";


const componentMap: { [key: string]: React.FC<any> } = {
    'TaskDetailed': TaskDetailed,
    'TaskAddForm': TaskAddForm,
    'TaskListAddForm': TaskListAddForm,
    'BoardAddForm': BoardAddForm,
};

export const ModalWindow = () => {
    const {contentType, contentProps} = useAppSelector(state => state.modal);
    const dispatcher = useAppDispatch();

    const ModalContent = contentType && componentMap[contentType];

    const handleModalClose = () => {
        dispatcher(modalWindowAction.resetModal());
    }
    return (
        <AnimatePresence>

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
            >
                <div
                    style={{background: "linear-gradient(0.38turn, #EBECF0, #EBECF0)", color: "black"}}
                    className={"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pb-8 z-50 rounded"}
                >
                    <div
                        style={{background: '#4289A7'}}
                        className={'flex justify-end text-white text-3xl pe-5 py-1 rounded-t'}>
                        <button
                            onClick={handleModalClose}
                        >
                            <FontAwesomeIcon icon={fas.faXmark}/>
                        </button>
                    </div>
                    {
                        ModalContent && <ModalContent {...contentProps} />
                    }
                </div>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 0.3}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.5}}
                    className={'fixed inset-0 bg-gray-700 z-40'}
                />
            </motion.div>

        </AnimatePresence>
    );
}