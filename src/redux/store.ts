import { configureStore } from '@reduxjs/toolkit';
import { examSlice, examsListSlice } from './slices/examSlice';
import { examApi } from './queries/ExamQueries';
import { usersSlice } from './slices/userSlice';

export const getStore = () =>
  configureStore({
    reducer: {
      exam: examSlice.reducer,
      examsList: examsListSlice.reducer,
      usersSlice: usersSlice.reducer,
      [examApi.reducerPath]: examApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(examApi.middleware,),
  });

export type AppStore = ReturnType<typeof getStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type Dispatch = AppStore['dispatch'];
