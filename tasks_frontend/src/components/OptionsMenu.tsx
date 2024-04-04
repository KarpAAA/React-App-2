import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FC} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";


type Option = {
    value: string,
    icon: IconProp,
    iconColor: string,
    event: () => void
}
type OptionMenuProps  = {
    options: Option[]
}
export const OptionsMenu: FC<OptionMenuProps> = ({options}) => {

    return (
        <div className={"absolute top-8 right-1 bg-white border rounded border-solid border-gray-500"}>
            <div
                className={'px-5 py-3  font-normal flex flex-col'}
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