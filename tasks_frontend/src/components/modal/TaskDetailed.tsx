import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {useGetTaskByIdQuery} from "../../store/apis/task.api";
import {FC} from "react";

type TaskDetailedProps = {
    id: string
}
export const TaskDetailed: FC<TaskDetailedProps> = ({id}) => {
    const {data: task} = useGetTaskByIdQuery(parseInt(id!));

    return (
        <>
            {task &&
                <div className={'flex'}>
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
        </>
    );
}