import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CounterInterface {
    value: number;
}

const initialState: CounterInterface = {
    value: 0,
};

const slice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        countIncrement(state) {
            state.value = state.value + 1
        },
        countDecrement(state) {
            state.value = state.value - 1
        }
    }
});

export default slice.reducer;

export const {
    countIncrement,
    countDecrement
} = slice.actions;