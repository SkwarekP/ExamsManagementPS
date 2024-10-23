import classes from './snackbar.module.scss';
import React, { useEffect, useState } from 'react';
import bulbIcon from '../atoms/icons/icons8-bulb-emoji-32.png';
import checkedIcon from '../atoms/icons/icons8-check-32.png';
import { SnackbarProps } from './snackbar.utils';

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  severity
}: SnackbarProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

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
    <div
      className={classes.wrapper}
      style={{...severityStyles[severity]}}
    >
      <div className={classes.circle}>
        <img src={severity === 'warning' ? bulbIcon : checkedIcon} alt="bulbIcon" />
      </div>
      <span>{message}</span>
    </div>
  ) : null
};
