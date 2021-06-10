import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store";
import axios from "axios";

export interface AppState {
    value: number;
    userJoined: boolean
}

const backendURL = 'http://localhost:3000'
const initialState: AppState = {
  value: 0,
  userJoined: false
};

export const joinRoomAsync = createAsyncThunk(
    'app/joinRoom',
 async (): Promise<boolean> => {
      try{
        await axios.get(`${backendURL}/123/join`)
        return true
      }catch (e) {
        return false
      }
    }
)
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(joinRoomAsync.fulfilled, (state, action) => {
          state.userJoined = action.payload;
        });
  },
});

export const getValue = ({app}: RootState) => app.value
export const { increment, decrement } = appSlice.actions;
export const { reducer } = appSlice;
