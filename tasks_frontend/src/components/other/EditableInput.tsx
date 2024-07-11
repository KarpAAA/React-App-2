import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";

export type EditableInputProps = {
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
                <div className={'flex flex-row gap-2'}>
                    <input
                        data-testid='editable-input'
                        className={'bg-transparent border border-solid max-w-52'}
                        type="text"
                        value={value}
                        onChange={handleChange}
                    />
                    <button
                        onClick={handleSave}
                        className={'border-none mr-5 text-green-800'}>
                        <FontAwesomeIcon icon={fas.faCheck}></FontAwesomeIcon>
                    </button>
                </div>
            );
        } else {
            return <span data-testid='editable-span' >{initialValue}</span>;
        }
    };
