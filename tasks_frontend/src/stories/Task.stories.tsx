import React from 'react';
import {TaskStatus} from "../types/task.status";
import {TaskPriority} from "../types/task.priority";
import {Operation} from "../types/operation";
import {Task} from "../components/Task";
import {Task as T} from "../types/task";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "../store/store";
import {Meta, StoryObj} from "@storybook/react";


const meta: Meta<typeof Task> = {
    title: "Task",
    component: (
        Task
    ),
};

export default meta;

type Story = StoryObj<typeof Task>;
const taskElement = (args: { task: T }) => (
    <Provider store={store}>
        <BrowserRouter>
            <Task {...args} />
        </BrowserRouter>
    </Provider>
);
export const Default: Story = (args: { task: T }) => (
    taskElement(args)
);
export const ShortenContent: Story = (args: { task: T }) => (
    taskElement(args)
);
export const ToDoStatus: Story = (args: { task: T }) => (
    taskElement(args)
);
export const InProgressStatus: Story = (args: { task: T }) => (
    taskElement(args)
);
export const DoneStatus: Story = (args: { task: T }) => (
    taskElement(args)
);
export const ReviewStatus: Story = (args: { task: T }) => (
    taskElement(args)
);
export const LowPriority: Story = (args: { task: T }) => (
    taskElement(args)
);
export const MediumPriority: Story = (args: { task: T }) => (
    taskElement(args)
);
export const HighPriority: Story = (args: { task: T }) => (
    taskElement(args)
);
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
Default.args = {
    task: {
        ...defaultTask
    }
};
ShortenContent.args = {
    task: {
        ...defaultTask,
        content: "Example content for the task with priority something"
    }
}
ToDoStatus.args = {
    task: {
        ...defaultTask,
        status: TaskStatus.TODO
    }
}
InProgressStatus.args = {
    task: {
        ...defaultTask,
        status: TaskStatus.IN_PROGRESS
    }
}
DoneStatus.args = {
    task: {
        ...defaultTask,
        status: TaskStatus.DONE
    }
}
ReviewStatus.args = {
    task: {
        ...defaultTask,
        status: TaskStatus.REVIEW
    }
}
LowPriority.args = {
    task: {
        ...defaultTask,
        priority: TaskPriority.LOW
    }
}

MediumPriority.args = {
    task: {
        ...defaultTask,
        priority: TaskPriority.MEDIUM
    }
}

HighPriority.args = {
    task: {
        ...defaultTask,
        priority: TaskPriority.HIGH
    }
}

