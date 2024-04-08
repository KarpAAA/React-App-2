import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "../store/store";
import {Meta, StoryObj} from "@storybook/react";
import {TaskList} from "../components/TaskList";
import {TaskList as TL} from "../types/task.list"
import {TaskStatus} from "../types/task.status";
import {TaskPriority} from "../types/task.priority";
import {Operation} from "../types/operation";


const defaultTask = {

    title: 'Task',
    content: 'Example content for the task',
    date: '2024-04-07',
    status: TaskStatus.TODO,
    priority: TaskPriority.LOW,
    history: [new Operation(1, 'Action 1', '2024-04-07')],
    id: 1,
    tasksListId: 1

}
const defaultTaskList = {
    title: "Task List",
    id: 1,
    number: 1,
    tasks: [defaultTask,defaultTask,defaultTask]
}

const meta: Meta<typeof TaskList> = {
    title: "TaskList",
    component: (
        TaskList
    )
};

export default meta;

type Story = StoryObj<typeof TaskList>;
const taskListElement = (args: { list: TL }) => (
    <Provider store={store}>
        <BrowserRouter>
            <TaskList {...args} />
        </BrowserRouter>
    </Provider>
);
export const Default: Story = (args: { list: TL }) => (
    taskListElement(args)
);
export const EmptyList: Story = (args: { list: TL }) => (
    taskListElement(args)
);

Default.args = {
    list: {
        ...defaultTaskList,
    },
};
EmptyList.args = {
    list: {
        ...defaultTaskList,
        tasks: []
    },
};
