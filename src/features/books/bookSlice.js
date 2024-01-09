import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
    books: [],
    search: ''
};


const bookSlice = createSlice({
    name: 'cart',
    initialState: defaultState,
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
    },
});

export const { setBooks, setSearch } = bookSlice.actions;

export default bookSlice.reducer;
