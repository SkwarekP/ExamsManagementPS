import { uniqueId } from 'lodash';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Error {
  id: string;
  message: string | null;
  statusCode: number | null;
}
export type Severity = "error" | "warning" | "success"

export interface SnackBar {
  severity: Severity;
  title: string | null;
  content: string | null;
  duration?: number;
  id: string;
}

export interface SnackbarState {
  error: Error[];
  snackbar: SnackBar[];
}

export type SnackbarPayload = {
  severity: Severity;
  title: string;
  id?: string;
  content?: string;
  duration?: number;
};

const initialState = {
  error: [],
  snackbar: [],
} as SnackbarState;

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setError(
      state,
      action: PayloadAction<{ statusCode?: number; message?: string }>
    ) {
      state.error = [
        ...state.error,
        {
          id: uniqueId('error'),
          message: action.payload.message || null,
          statusCode: action.payload.statusCode || null,
        },
      ];
    },
    resetError(state) {
      state.error = [];
    },
    setSnackBar(state, action: PayloadAction<SnackbarPayload>) {
      console.log(action);
      const payload = {
        id: action.payload.id || uniqueId('snackbar'),
        severity: action.payload.severity,
        title: action.payload.title || null,
        content: action.payload.content || null,
        duration: action.payload.duration,
      };
      state.snackbar = [...state.snackbar, payload];
    },
    resetSnackBar(state) {
      state.snackbar = [];
    },
    removeSnackbar(state, action: PayloadAction<{ id: string }>) {
      state.snackbar = state.snackbar.filter((x) => x.id !== action.payload.id);
    },
  },
});

export const {
  setError,
  resetError,
  setSnackBar,
  resetSnackBar,
  removeSnackbar,
} = snackbarSlice.actions;

export default snackbarSlice.reducer;
