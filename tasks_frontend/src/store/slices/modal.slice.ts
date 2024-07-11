import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ModalWindowState {
    visible: boolean,
    contentType: string,
    contentProps: any,
}

const initialState: ModalWindowState = {
    visible: false,
    contentType: '',
    contentProps: {}
};

const modalWindow = createSlice({
    name: "modalWindow",
    initialState,
    reducers: {
        setModalVisible(state, action: PayloadAction<boolean>) {
            state.visible = action.payload;
        },
        setModalContent(state, action: PayloadAction<{contentType: string, contentProps: any}>) {
            state.contentType = action.payload.contentType;
            state.contentProps = action.payload.contentProps || {};
        },
        resetModal(state) {
            state.visible = false;
            state.contentType = '';
            state.contentProps = {};
        }
    },
});

export const modalWindowAction = modalWindow.actions;
export default modalWindow.reducer;