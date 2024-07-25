import { createSlice } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import chatReducer from "./chatSlice";

const searchSlice =createSlice({
    name:'search',
    initialState:{

    },
    reducers:{
        chacheResult: (state,action) => {
            state = Object.assign(state,action.payload)
          },
    }
})

export const {chacheResult} = searchSlice.actions
export default searchSlice.reducer