import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from "../store";
import axios from "axios";
import {chromeBrowserList, edgeBrowserList, firefoxBrowserList} from "./helper";

export type BrowserDetail = {
    browser: string
    version: string
}

export interface AppState {
    supportedBrowserList: BrowserDetail[],
    stats: Record<string, unknown>
}

const initialState: AppState = {
    supportedBrowserList: [...chromeBrowserList, ...firefoxBrowserList, ...edgeBrowserList],
    stats: {}
}

const backendURL = 'http://localhost:8080'
export const fetchBrowserImplementationDetailsAsync = createAsyncThunk(
    'app/browserImplementationDetails',
    async ({browser, version}: {browser: string, version: string}, {rejectWithValue}) => {
        try{
            const { data } = await axios.get(`${backendURL}/stats/browser/${browser}/version/${version}`)
            return data
        }catch (e) {
            return rejectWithValue(e)
        }

    }
)

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchBrowserImplementationDetailsAsync.fulfilled,
            (state, action) => {
            console.warn('->', 'fullfiled', action)
            state.stats = action.payload;
        })
  },
});

export const selectBrowserList = (state: RootState) => state.app.supportedBrowserList
//export const selectImplementationDetails = ({app}: RootState) => app.stats
export const {reducer} = appSlice;
