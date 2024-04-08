import {fireEvent, render} from '@testing-library/react';
import {TaskStatus} from '../types/task.status';
import {Task} from "../components/Task";
import {Provider} from "react-redux";
import {TaskPriority} from "../types/task.priority";
import {Constants} from "../utils/helpers/constants";
import {createTestStore} from "../store/store";

let store;
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe('Task component', () => {

    beforeEach(() => {
        store = createTestStore();
    });

    const exampleTask = {
        id: 1,
        title: 'Example Task',
        content: 'Example content for the task Example content for the task Example content for the task Example content for the task',
        priority: TaskPriority.HIGH,
        status: TaskStatus.TODO,
        date: '2024-04-07'
    };

    test('renders task with correct content', () => {
        const task = {
            ...exampleTask,
            content: "content"
        };

        const {getByText} = render(
            <Provider store={store}>
                <Task task={task}/>
            </Provider>
        );

        expect(getByText(task.title)).toBeTruthy();
        expect(getByText(task.content)).toBeTruthy();
        expect(getByText(task.date)).toBeTruthy();

    });

    test('renders task with shorten content', () => {
        const task = {
            ...exampleTask
        };

        const {getByTestId} = render(
            <Provider store={store}>
                <Task task={task}/>
            </Provider>
        );

        const content = getByTestId('task-content');
        expect(content.textContent).toHaveLength(Constants.maxTaskChars + 3);
    });

    test('task title clicked', () => {
        const task = {
            ...exampleTask
        };

        const {getByText} = render(
            <Provider store={store}>
                <Task task={task}/>
            </Provider>
        );
        const taskElement = getByText(task.title);
        fireEvent.click(taskElement);
        expect(mockedNavigate).toHaveBeenCalledWith(`/task/${task.id}`);

        const state = store.getState();
        const modalOpenState = state.ui.modalOpenState;
        expect(modalOpenState).toBe(true);
    });


});
