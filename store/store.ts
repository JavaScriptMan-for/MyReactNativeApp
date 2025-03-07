import {configureStore} from "@reduxjs/toolkit"
import clientSlice from "./mainSlice";
import { MainSlice } from "../types/redux.type";

export interface RootState {
    client: MainSlice;
}
export default configureStore({
    reducer: {
        client: clientSlice,
    }
})