import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {uiActions} from "../../store/slices/ui.slice";
import {useParams} from "react-router-dom";
import {useGetTaskByIdQuery} from "../../store/apis/task.api";
import {useAppDispatch} from "../../app/hooks";
import {FC} from "react";

type TaskDetailedProps =  {
    modalContainer: HTMLElement | null
}
export const TaskDetailed: FC<TaskDetailedProps> = ({modalContainer}) => {
    const dispatcher = useAppDispatch();

    const {id} = useParams();
    const {data: task} = useGetTaskByIdQuery(parseInt(id!));

    if (modalContainer) {
        modalContainer.style.left = '10%';
        modalContainer.style.top = '10%';
        modalContainer.style.bottom = '10%';
        modalContainer.style.right = '10%';
        modalContainer.style.width = '80%';
        modalContainer.style.height = '80%';
    }

    const handleModalClose = () => {
        dispatcher(uiActions.setModalOpenState(false));
    }

    return (
        <div
            className={"w-full h-full bg-white"}>
            <div
                style={{background: '#4289A7'}}
                onClick={handleModalClose}
                className={'flex justify-end text-white text-3xl px-5 py-2 -full rounded-t'}>
                <FontAwesomeIcon icon={fas.faXmark}/>
            </div>

            { task &&
                <div className={'flex h-full'}>
                    <div className={'box-border w-3/5 bg-white p-10'}>
                        <div className={'mt-5 flex flex-col'}>
                            <div className={'flex flex-row justify-between align-middle'}>
                                <div className={'font-bold text-3xl'}>{task.title}</div>

                            </div>
                            <div className={'flex flex-row text-black text-md mt-5 font-medium'}>
                                <div className={'flex flex-col mr-10 text-gray-600'}>
                                    <div className={'mt-2'}>
                                        <FontAwesomeIcon icon={fas.faCrosshairs}
                                                         className={"mr-4 text-gray-600"}></FontAwesomeIcon>
                                        Status
                                    </div>
                                    <div className={'mt-2'}>
                                        <FontAwesomeIcon icon={fas.faCalendar}
                                                         className={"mr-4 text-gray-600"}></FontAwesomeIcon>
                                        Due to
                                    </div>
                                    <div className={'mt-2'}>
                                        <FontAwesomeIcon icon={fas.faTag}
                                                         className={"mr-4 text-gray-600"}></FontAwesomeIcon>
                                        Priority
                                    </div>
                                </div>
                                <div className={'flex flex-col ml-10'}>
                                    <div className={'mt-2'}>{task.status}</div>
                                    <div className={'mt-2'}>{task.date}</div>
                                    <div className={'mt-2'}>{task.priority}</div>
                                </div>

                            </div>
                            <div className={'font-bold text-2xl mt-10 mb-5'}>Description</div>
                            <div className={''}>
                                {task.content}
                            </div>
                        </div>
                    </div>
                    <div className={'box-border w-2/5 bg-gray-200 p-10'}>
                        <div className={'mt-5'}>
                            <div className={'font-bold text-3xl mb-5'}>Activity</div>

                            <div className={'overflow-auto max-h-96'}> {/* Додаємо стилі overflow та max-height */}
                                {
                                    task && task.history && task.history.map(operation => (
                                        <div className={'px-5 text-gray-500 pt-5'}>
                                            <div className={'flex'}>
                                                <FontAwesomeIcon icon={fas.faCircle}
                                                                 className={`mr-2 text-sm w-2 h-2 mt-2 text-gray-500`}/>
                                                <div>
                                                    {operation.action}
                                                </div>
                                            </div>
                                            <div className={'italic mt-2 ml-3'}>
                                                {operation.dateTime}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                </div>
            }

        </div>
    );
}