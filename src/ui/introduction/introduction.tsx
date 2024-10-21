import React from 'react';
import classes from './introduction.module.scss';

export const Introduction = () => {
  return (
    <div>
      <h2>Welcome!</h2>
      <p className={classes.introduction}>
        Choose your exam. Each one of them contains 15 questions with one
        correct answer. It's possible to back to previous questions. Ensure you
        always click "next" button to confirm your answer before moving to the
        next or previous question.
      </p>
    </div>
  );
};
