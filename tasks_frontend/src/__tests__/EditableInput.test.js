import {fireEvent, getByTestId, render} from '@testing-library/react';
import {Provider} from "react-redux";
import {EditableInput} from "../components/other/EditableInput";
import {createTestStore} from "../store/store";

let store;
const mockedHandleChange = jest.fn();
const mockedHandleSave = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe('Task component', () => {

    beforeEach(() => {
        store = createTestStore();
    });


    const inputDataExample = {
        isEditable: true,
        handleChange: mockedHandleChange,
        value: 'Value',
        handleSave: mockedHandleSave,
        initialValue: "Initial value",
    };
    test('editable input isEditable(true) state', () => {
        const inputData = {
            ...inputDataExample,
        };

        const {getByText, getByTestId, queryByTestId } = render(
            <Provider store={store}>
                <EditableInput
                    handleChange={inputData.handleChange}
                    isEditable={inputData.isEditable}
                    value={inputData.value}
                    handleSave={inputData.handleSave}
                    initialValue={inputData.initialValue}
                />
            </Provider>
        );

        const input = getByTestId('editable-input');
        expect(input.value).toEqual(inputData.value);
        expect(queryByTestId('editable-span')).not.toBeTruthy();
        expect(queryByTestId('editable-span')).toBeNull();

    });


    test('editable input isEditable(false) state', () => {
        const inputData = {
            ...inputDataExample,
            isEditable: false
        };

        const {getByText, getByTestId, queryByTestId } = render(
            <Provider store={store}>
                <EditableInput
                    handleChange={inputData.handleChange}
                    isEditable={inputData.isEditable}
                    value={inputData.value}
                    handleSave={inputData.handleSave}
                    initialValue={inputData.initialValue}
                />
            </Provider>
        );

        const input = queryByTestId('editable-input');
        const span = queryByTestId('editable-span');
        expect(span.textContent).toEqual(inputData.initialValue);
        expect(input).not.toBeTruthy();
        expect(input).toBeNull();
    });

    test('editing input', async () => {
        const inputData = {
            ...inputDataExample
        };

        const {getByTestId, findByTestId, queryByTestId} = render(
            <Provider store={store}>
                <EditableInput
                    handleChange={inputData.handleChange}
                    isEditable={inputData.isEditable}
                    value={inputData.value}
                    handleSave={inputData.handleSave}
                    initialValue={inputData.initialValue}
                />
            </Provider>
        );

        const input = queryByTestId('editable-input');
        fireEvent.change(input, {target: {value: 'a'}});
        expect(inputData.handleChange).toHaveBeenCalled();
    });


});
