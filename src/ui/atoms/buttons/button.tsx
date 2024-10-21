import classes from './button.module.scss';
import { ReactNode } from 'react';

interface IExamTypeButton {
  onClick?: (x: any) => void;
  children: ReactNode;
  width?: number;
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
  className?: string | undefined;
}

export const Button = ({
  children,
  onClick,
  width,
  type,
  disabled,
  className,
}: IExamTypeButton) => {
  return (
    <button
      type={type}
      className={`${classes.button} ${className}`}
      onClick={onClick}
      style={width ? { width: `${width}px` } : disabled ? { opacity: 0.3 } : {}}
    >
      {children}
    </button>
  );
};
