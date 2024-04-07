import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";

type EditableInputProps = {
    initialValue: string,
    isEditable: boolean,
    handleSave: () => void,
    value:string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const EditableInput: FC<EditableInputProps> =
    ({initialValue, isEditable, handleSave,value,handleChange}) => {

        if (isEditable) {
            return (
                <div>
                    <input
                        className={'bg-transparent border border-solid max-w-52'}
                        type="text"
                        value={value}
                        onChange={handleChange}
                    />
                    <button
                        style={{color: "#4289A7"}}
                        onClick={handleSave}
                        className={'border-none mr-5'}>
                        <FontAwesomeIcon icon={fas.faEdit}></FontAwesomeIcon>
                    </button>
                </div>
            );
        } else {
            return <span>{initialValue}</span>;
        }
    };
