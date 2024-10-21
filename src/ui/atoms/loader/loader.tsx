import classes from './loader.module.scss';

export const Loader = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.loader}></div>
    </div>
  );
};
