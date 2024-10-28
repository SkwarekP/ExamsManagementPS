import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  SnackbarPayload,
  removeSnackbar,
  resetSnackBar,
  setSnackBar,
} from '../redux/slices/alertSlice';

export type Snackbar = {
  show: (payload: SnackbarPayload) => void;
  reset: () => void;
  remove: (id: string) => void;
};

const useSnackbar = () => {
  const dispatch = useDispatch();

  const show = useCallback(
    (payload: SnackbarPayload) => {
      dispatch(setSnackBar(payload));
    },
    [dispatch]
  );

  const remove = useCallback(
    (id: string) => {
      dispatch(removeSnackbar({ id }));
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    dispatch(resetSnackBar());
  }, [dispatch]);

  return useMemo(
    () => ({
      show,
      reset,
      remove,
    }),
    [reset, show, remove]
  );
};

export { useSnackbar };
