import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {EditableInput} from "../components/other/EditableInput";

type EditableInputProps = {
    initialValue: string,
    isEditable: boolean,
    handleSave: () => void,
    value:string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const meta: Meta<typeof EditableInput> = {
    title: "EditableInput",
    component: (
        EditableInput
    )
};

export default meta;


const defaultEditable: EditableInputProps = {
    initialValue: "Initial",
    isEditable: true,
    handleSave: () => {},
    value: "Some",
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {}
}

const editableElement = (args: EditableInputProps) => (
    <EditableInput {...args} />
);

type Story = StoryObj<typeof EditableInput>;
export const Editable: Story = (args: EditableInputProps) => (
    editableElement(args)
);

Editable.args = {
    ...defaultEditable
};

export const NotEditable: Story = (args: EditableInputProps) => (
    editableElement(args)
);

NotEditable.args = {
    ...defaultEditable,
    isEditable: false
};
