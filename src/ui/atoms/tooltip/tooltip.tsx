import classes from './tooltip.module.scss';
import { useEffect, useState } from 'react';
import bulbIcon from '../icons/icons8-bulb-emoji-32.png';
import checkedIcon from '../icons/icons8-check-32.png';

interface IToolTip {
  isError?: boolean;
  isWarning?: boolean;
  isSuccess?: boolean;
  message: string;
}

export const Tooltip = ({
  isError,
  message,
  isWarning,
  isSuccess,
}: IToolTip) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [isVisible]);

  return isVisible ? (
    <div
      className={classes.wrapper}
      style={
        isError
          ? { background: 'darkred', color: 'white' }
          : isWarning
            ? { background: 'orangered', color: 'white' }
            : isSuccess
              ? { background: 'green', color: 'white' }
              : {}
      }
    >
      <div className={classes.circle}>
        <img src={isWarning ? bulbIcon : checkedIcon} alt="bulbIcon" />
      </div>
      <span>{message}</span>
    </div>
  ) : (
    <div> </div>
  );
};
