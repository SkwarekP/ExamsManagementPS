import classes from './modal.module.scss';
import { Button } from '../atoms/buttons/button';
import warnIcon from '../atoms/icons/icons8-bulb-emoji-32.png';

export interface IModal {
  onConfirm: () => void;
  onClose: () => void;
}

export const ModalWarning = ({ onConfirm, onClose }: IModal) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.warning}>
          <h3>WARNING !</h3>
          <div>
            <img src={warnIcon} alt="warning" />
          </div>
        </div>
        <p>Your current results will be lost.</p>
      </div>
      <div className={classes.button__list}>
        <Button onClick={() => onClose()}>close</Button>
        <Button onClick={() => onConfirm()}>confirm</Button>
      </div>
    </div>
  );
};
