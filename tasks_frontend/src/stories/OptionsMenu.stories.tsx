import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {OptionsMenu} from "../components/OptionsMenu";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";


const meta: Meta<typeof OptionsMenu> = {
    title: "OptionsMenu",
    component: (
        OptionsMenu
    )
};

export default meta;


type Option = {
    value: string,
    icon: IconProp,
    iconColor: string,
    event: (e?:any) => void
}
export type OptionMenuProps  = {
    options: Option[],
    right?: boolean
}

const defaultOptionsMenu: OptionMenuProps = {
    options: [
        {
            event: () => {},
            value: "Edit",
            icon: fas.faEdit,
            iconColor: 'black',
        },
        {
            event: () => {},
            value: "Delete",
            icon: fas.faTrash,
            iconColor: 'red-500',
        }
    ],
    right: true
}

const optionMenuComponent = (args: OptionMenuProps) => (
    <OptionsMenu {...args} />
);

type Story = StoryObj<typeof OptionsMenu>;
export const Default: Story = (args: OptionMenuProps) => (
    optionMenuComponent(args)
);

Default.args = {
    ...defaultOptionsMenu
};
export const NoOptions: Story = (args: OptionMenuProps) => (
    optionMenuComponent(args)
);

NoOptions.args = {
    ...defaultOptionsMenu,
    options: []
};
