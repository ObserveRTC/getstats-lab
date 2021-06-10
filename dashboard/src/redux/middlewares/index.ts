import { getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
export const middleware = [...getDefaultMiddleware(), logger];
