import classes from './introduction.module.scss';

export const Introduction = () => {
  return (
    <div className={classes.introContainer}>
      <h1>🎉 Welcome to Your Quiz Adventure! 🎉</h1>
      <p className={classes.introduction}>
        Get ready to test your knowledge! Each quiz contains 5, 15 or 30 questions
        with one correct answer each. Don’t worry, you can always go back to review previous questions.
      </p>
      <p className={classes.tips}>
        Tip: Remember to hit "Next" to confirm your answer before moving to another question. Good luck!
      </p>
    </div>
  );
};
