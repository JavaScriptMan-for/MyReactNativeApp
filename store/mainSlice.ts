
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MainSlice } from './../types/redux.type';


const additionallyState: MainSlice = {

}

const additionallySlice = createSlice({
    name: "additionally",
    initialState: additionallyState,
    reducers: {
      
    }
})

export const { } = additionallySlice.actions;

export default additionallySlice.reducer;