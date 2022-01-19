import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from "../store";
import axios from "axios";
import {chromeBrowserList, edgeBrowserList, firefoxBrowserList, standardStatsList} from "./helper";

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
    supportedBrowserList: [...standardStatsList, ...chromeBrowserList, ...firefoxBrowserList, ...edgeBrowserList],
    stats: {},
    status: Status.noop
}

const backendURL = 'http://localhost:8080'
// const backendURL = ''
export const fetchBrowserImplementationDetailsAsync = createAsyncThunk(
    'app/browserImplementationDetails',
    async ({browser, version}: BrowserDetail, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(`${backendURL}/stats/browser/${browser}/version/${version}`, {
                timeout: 60 * 1000
            })
            return data
        } catch (e) {
            return rejectWithValue(e)
        }

    }
)

export const fetchBrowserListImplementationDetailsAsync = createAsyncThunk(
    'app/browserListImplementationDetails',
    async ( browserDetails: BrowserDetail[], {rejectWithValue}) => {
        try {
            const promises = browserDetails.map(({browser, version}) => {
                return axios.get(`${backendURL}/stats/browser/${browser}/version/${version}`, {
                    timeout: 60 * 1000
                })
            })
            const result = await Promise.all(promises)
            return result.map( item => item.data)
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
            .addCase(fetchBrowserListImplementationDetailsAsync.fulfilled,
                (state, action) => {
                    const [{browser: browserLeft, version:browserLeftVersion}, {browser: browserRight, version: browserRightVersion}] = action.meta.arg
                    state.status = Status.fullfilled
                    state.stats[`${browserLeft}-${browserLeftVersion}`] = action.payload[0];
                    state.stats[`${browserRight}-${browserRightVersion}`] = action.payload[1];
                })
            .addCase(fetchBrowserListImplementationDetailsAsync.pending,
                (state, action) => {
                    state.status = Status.pending
                })
            .addCase(fetchBrowserListImplementationDetailsAsync.rejected,
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
