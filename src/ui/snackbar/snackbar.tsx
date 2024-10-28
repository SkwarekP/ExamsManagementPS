import classes from './snackbar.module.scss';
import React, { useEffect } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { CheckIcon } from '@heroicons/react/20/solid';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useSnackbar } from '../../hooks/useSnackbar';

export const Snackbar: React.FC = () => {
  const snackbarState = useSelector((state: RootState) => state.snackbarState.snackbar)
  const snackbar = useSnackbar();

  const displayIcon = (): JSX.Element => {
    if (snackbarState[0]?.severity === 'warning') return <ExclamationTriangleIcon />;
    else if (snackbarState[0]?.severity === 'error') return <ExclamationCircleIcon />;
    else return <CheckIcon />;
  };

  useEffect(() => {
      let timer: NodeJS.Timeout;
      if(snackbarState.length > 0){
        timer = setTimeout(() => {
          snackbar.reset();
        }, 2500);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [snackbarState, snackbar]);

  if(snackbarState.length > 0) {
    return (
      <div className={classes.wrapper} style={{ ...severityStyles[snackbarState[0]?.severity] }}>
        <div className={classes.icon__title}>
          <div className={classes.icon_container}>{displayIcon()}</div>
          <span>{snackbarState[0]?.title}</span>
        </div>
        {snackbarState[0]?.content && <span className={classes.sub_message}>{snackbarState[0].content}</span>}
      </div>
    );
  } else return null

};

const severityStyles: Record<string, React.CSSProperties> = {
  error: { background: 'darkred', color: 'white' },
  warning: { background: 'orangered', color: 'white' },
  success: { background: 'green', color: 'white' },
};