import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {uiActions} from "../store/slices/ui.slice";
import {useGetAllHistoryQuery} from "../store/apis/task.api";
import {useAppDispatch, useAppSelector} from "../app/hooks";


export const History = () => {
    const dispatcher = useAppDispatch();
    const {selectedBoardId} = useAppSelector(state => state.ui);
    const {data: operations} = useGetAllHistoryQuery(selectedBoardId!);

    const handleCloseHistory = () => {
        dispatcher(uiActions.setHistoryOpenState(false));
    }
    return (
        <div
            style={{background: '#4289A7'}}
            className={"fixed right-0 top-0 z-10 h-full w-1/4"}>
            <div className={'flex flex-row justify-between p-4 text-white text-lg w-full'}>
                <div>History</div>
                <div onClick={handleCloseHistory}><FontAwesomeIcon className={'px-1'} icon={fas.faXmark}/></div>
            </div>

            <div
                style={{background: "linear-gradient(0.38turn, #EBECF0, #EBECF0)"}}
                className={'bg-gray-100 h-full overflow-auto py-10'}>
                {
                    operations && operations.length > 0
                    &&
                    operations.map(operation => (
                        <div className={'px-10 text-gray-500 '} key={operation.id}>
                            <div className={'flex'}>
                                <FontAwesomeIcon icon={fas.faCircle}
                                                 className={`mr-2 text-sm w-2 h-2 mt-2 text-gray-500`}/>
                                <div>
                                    {operation.action}
                                </div>
                            </div>
                            <div className={'italic mt-2 ml-3 mb-5'}>
                                {operation.dateTime}
                            </div>
                        </div>

                    ))
                }

            </div>

        </div>
    )
}
