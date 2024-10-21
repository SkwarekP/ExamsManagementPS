import classes from './backdrop.module.scss';

interface IBackdrop {
  onClose: () => void;
}
export const Backdrop = ({ onClose }: IBackdrop) => {
  return <div className={classes.backdrop} onClick={() => onClose()}></div>;
};
