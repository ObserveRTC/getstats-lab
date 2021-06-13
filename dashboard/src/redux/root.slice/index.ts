import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from "../store";
import axios from "axios";
import {chromeBrowserList, edgeBrowserList, firefoxBrowserList} from "./helper";

export type BrowserDetail = {
    browser: string
    version: string
}
export type StatsDetails = {
    [key: string]: Array<string>
}

export enum Status {
    fullfilled,
    rejected,
    pending,
    noop
}

export interface AppState {
    supportedBrowserList: BrowserDetail[],
    stats: Record<string, StatsDetails>
    status: Status
}

const initialState: AppState = {
    supportedBrowserList: [...chromeBrowserList, ...firefoxBrowserList, ...edgeBrowserList],
    stats: {},
    status: Status.noop
}

const backendURL = 'http://localhost:8080'
export const fetchBrowserImplementationDetailsAsync = createAsyncThunk(
    'app/browserImplementationDetails',
    async ({browser, version}: BrowserDetail, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(`${backendURL}/stats/browser/${browser}/version/${version}`)
            return data
        } catch (e) {
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
                    const {browser, version} = action.meta.arg
                    state.status = Status.fullfilled
                    state.stats[`${browser}-${version}`] = action.payload;
                })
            .addCase(fetchBrowserImplementationDetailsAsync.pending,
                (state, action) => {
                    state.status = Status.pending
                })
            .addCase(fetchBrowserImplementationDetailsAsync.rejected,
                (state, action) => {
                    state.status = Status.rejected
                })
    },
});

export const selectBrowserList = ({app: {supportedBrowserList}}: RootState) => supportedBrowserList
export const selectImplementationDetails = ({
                                                browser,
                                                version
                                            }: BrowserDetail) => ({app: {stats}}: RootState) => stats[`${browser}-${version}`]
export const queryStatus = ({app: {status}}: RootState) => status
export const {reducer} = appSlice;
