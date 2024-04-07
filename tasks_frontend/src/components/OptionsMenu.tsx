import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FC} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";


type Option = {
    value: string,
    icon: IconProp,
    iconColor: string,
    event: (e?:any) => void
}
type OptionMenuProps  = {
    options: Option[],
    right?: boolean
}
export const OptionsMenu: FC<OptionMenuProps> = ({options, right}) => {

    return (
        <div className={`absolute top-6 ${ right ? 'left-1' : 'right-1'} bg-white border rounded border-solid border-gray-500 z-50`}>
            <div
                className={'px-5 py-3 font-normal flex flex-col items-start'}
            >
                {options.map((option,index) => (
                    <div key={index} className={`mb-2 whitespace-nowrap text-sm text-${option.iconColor}`} onClick={option.event}>
                        <FontAwesomeIcon className={'pr-2'}
                                         icon={option.icon}/>
                        {option.value}
                    </div>
                ))}

            </div>

        </div>
    );
}