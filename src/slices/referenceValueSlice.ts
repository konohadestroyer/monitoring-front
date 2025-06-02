import { createSlice } from "@reduxjs/toolkit";
import { Journal } from "../components/Graph/Graph";

interface ReferenceValueState {
    data: ReferenceValueInterface[];
    messages: Journal;
    isAlert: boolean;
    alertMessage: string;
}

interface ReferenceValueInterface {
    id: string;
    reference: { value: string; id: string };
    name: string;
    journal: Journal;
}

const initialState: ReferenceValueState = {
    data: [],
    messages: {
        time: "",
    },
    isAlert: false,
    alertMessage: "",
};

const referenceValueSlice = createSlice({
    name: "referenceValue",
    initialState,
    reducers: {
        setReferenceValues: (state, action) => {
            state.data = action.payload;
        },
        setMessages: (state, action) => {
            const { id, value, time } = action.payload;
            // Обновляем или добавляем новое сообщение в объект messages с ключом id
            state.messages.id = id;
            state.messages.value = value;
            state.messages.time = time;
        },
        setAlert: (state, action) => {
            state.isAlert = action.payload.isOn;
            state.alertMessage = action.payload.sensor;
        },
    },
});

export const { setReferenceValues, setMessages, setAlert } =
    referenceValueSlice.actions;
export default referenceValueSlice.reducer;
