import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {FC} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {AnimatePresence, motion} from "framer-motion";


type Option = {
    value: string,
    icon: IconProp,
    iconColor: string,
    event: (e?: any) => void
}
export type OptionMenuProps = {
    options: Option[],
    show: boolean,
    right?: boolean
}
export const OptionsMenu: FC<OptionMenuProps> = ({show, options, right}) => {

    if(!show) {
        return  null;
    }

    return (
        <AnimatePresence>
                <motion.div
                    key="content"
                    initial={{opacity: 0}}
                    animate={{opacity: 10}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.5}}
                >
                        <div
                            className={`
            absolute top-6 ${right ? 'left-1' : 'right-1'} 
            bg-white border rounded border-solid border-gray-500 z-50`}>
                            <div
                                className={'px-5 py-3 gap-2 font-normal flex flex-col items-start'}
                            >
                                {options.map((option, index) => (
                                    <div
                                        key={index} className={`
                    flex flex-row justify-center items-center whitespace-nowrap text-sm text-${option.iconColor}
                    hover:text-gray-900 
                    `}
                                        onClick={option.event}>
                                        <FontAwesomeIcon
                                            className={`pr-2 text-${option.iconColor}`}
                                            icon={option.icon}/>
                                        {option.value}
                                    </div>
                                ))}

                            </div>
                        </div>
                </motion.div>

        </AnimatePresence>


    );
}