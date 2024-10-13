import {configureStore} from "@reduxjs/toolkit";
import {examSlice, examsListSlice} from "./examSlice";
import { examApi } from "./queries/ExamQueries";

export const getStore = () => configureStore({
    reducer: {
        exam: examSlice.reducer,
        examsList: examsListSlice.reducer,
        [examApi.reducerPath]: examApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(examApi.middleware)
})

export type AppStore = ReturnType<typeof getStore>;
export type RootState = ReturnType<AppStore['getState']>
export type Dispatch = AppStore['dispatch']