import classes from './questionList.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import React, { useEffect, useState } from 'react';
import { IExam } from '../../types';

interface Props {
  onAnswer: (answer: string | undefined) => void;
  exam: IExam;
}

export const QuestionList: React.FC<Props> = ({ onAnswer, exam }) => {
  const state = useSelector((state: RootState) => state.exam);
  const [currentAnswer, setCurrentAnswer] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (state.type === 'QUESTION') {
      if (state?.answers[state.counter - 1]?.answer) {
        setCurrentAnswer(state?.answers[state.counter - 1]?.answer);
      }
      onAnswer(state?.answers[state.counter - 1]?.answer ?? undefined);
    }
  }, [state, onAnswer]);

  return (
    <>
      {state.type === 'QUESTION' &&
        exam?.questions?.map((item, idx) => {
          if (state.counter - 1 === idx) {
            return (
              <div key={state.counter}>
                <div className={classes.question}>
                  <p>{item.question}</p>
                </div>
                {item.answers.map((opt, optIdx) => (
                  <div key={opt}>
                    <label
                      htmlFor={`answer-${optIdx}`}
                      className={classes.option}
                    >
                      <input
                        id={`answer-${optIdx}`}
                        type="radio"
                        name="option"
                        value={opt}
                        checked={currentAnswer === opt}
                        onChange={(e) => {
                          onAnswer(e.target.value);
                          setCurrentAnswer(e.target.value);
                        }}
                      />
                      <span>{opt}</span>
                    </label>
                  </div>
                ))}
              </div>
            );
          }
          return <></>;
        })}
    </>
  );
};
