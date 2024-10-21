import { configureStore } from '@reduxjs/toolkit';
import { examSlice, examsListSlice } from './slices/examSlice';
import { examApi } from './queries/ExamQueries';
import { usersApi } from './queries/UserQueries';
import { usersSlice } from './slices/userSlice';

export const getStore = () =>
  configureStore({
    reducer: {
      exam: examSlice.reducer,
      examsList: examsListSlice.reducer,
      usersSlice: usersSlice.reducer,
      [examApi.reducerPath]: examApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(examApi.middleware, usersApi.middleware),
  });

export type AppStore = ReturnType<typeof getStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type Dispatch = AppStore['dispatch'];
