import classes from './snackbar.module.scss';
import React, { useEffect, useState } from 'react';
import bulbIcon from '../atoms/icons/icons8-bulb-emoji-32.png';
import checkedIcon from '../atoms/icons/icons8-check-32.png';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { CheckIcon } from '@heroicons/react/20/solid';

import { SnackbarProps } from './snackbar.utils';

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  submessage,
  severity,
}: SnackbarProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const displayIcon = (): JSX.Element => {
    if (severity === 'warning') return <ExclamationTriangleIcon />;
    else if (severity === 'error') return <ExclamationCircleIcon />;
    else return <CheckIcon />;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [isVisible]);

  const severityStyles: Record<string, React.CSSProperties> = {
    error: { background: 'darkred', color: 'white' },
    warning: { background: 'orangered', color: 'white' },
    success: { background: 'green', color: 'white' },
  };

  return isVisible ? (
    <div className={classes.wrapper} style={{ ...severityStyles[severity] }}>
      <div className={classes.icon__title}>
        <div className={classes.icon_container}>{displayIcon()}</div>
        <span>{message}</span>
      </div>
      {submessage && <span className={classes.sub_message}>{submessage}</span>}
    </div>
  ) : null;
};
