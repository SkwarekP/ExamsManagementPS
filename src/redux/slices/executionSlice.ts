import { createSlice } from "@reduxjs/toolkit";
import { Execution } from "../../types";

export const executionSlice = createSlice({
    name: 'executionSlice',
    initialState: {executionId: null} as Execution,
    reducers: {
      setExecutionId: (state, action: {payload: {executionId: string}}) => {
        state.executionId = action.payload.executionId
      }
    },
  });

export const executionActions = executionSlice.actions;
