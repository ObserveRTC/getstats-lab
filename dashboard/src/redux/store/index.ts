import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { reducer } from '../root.slice';
import {middleware} from "../middlewares";

export const store = configureStore({
  reducer: {
    app: reducer,
  },
  middleware
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
