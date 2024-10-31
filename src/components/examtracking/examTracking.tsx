import classes from './examTracking.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IExam } from '../../types';
import { useEffect, useState } from 'react';
import { QuestionButton } from './QuestionButton';
import rightArrowIcon from '../../ui/atoms/icons/right-arrow.png';
import leftArrowIcon from '../../ui/atoms/icons/left.png';

interface Props {
  exam: IExam;
  onShowTooltip: (message: string) => void;
}

export const ExamTracking = ({ exam, onShowTooltip }: Props) => {
  const state = useSelector(
    (state: RootState) => state.exam.type === 'EXAM_PROCESS' && state.exam
  );
  const [isPaginationNeeded, setIsPaginationNeeded] = useState(false);
  const [nextQuestions, setNextQuestions] = useState(false);

  useEffect(() => {
    if (exam.answersAmount >= 30) {
      setIsPaginationNeeded(true);
    }
  }, [exam.answersAmount]);

  useEffect(() => {
    if (state) {
      if (state.counter > 15) {
        setNextQuestions(true);
      } else setNextQuestions(false);
    }
  }, [state]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.step}>
        {nextQuestions && (
          <>
            <button
              className={classes.circle}
              onClick={() => setNextQuestions((prevState) => !prevState)}
            >
              <img
                style={{ transform: 'translate(-60%,-50%)' }}
                src={leftArrowIcon}
                alt="right arrow"
              />
            </button>
            <div className={`${classes.line} ${classes.filledLine}`} />
          </>
        )}
        {exam?.questions?.map((item, index) => {
          if (isPaginationNeeded) {
            if (
              Math.floor(exam?.answersAmount / 2) >= index &&
              !nextQuestions
            ) {
              return (
                <QuestionButton
                  item={item}
                  index={index}
                  onShowTooltip={onShowTooltip}
                />
              );
            }
            if (
              Math.floor(exam?.answersAmount / 2) < index &&
              nextQuestions
            ) {
              return (
                <QuestionButton
                  item={item}
                  index={index}
                  onShowTooltip={onShowTooltip}
                />
              );
            }
          } else {
            return (
              <QuestionButton
                item={item}
                index={index}
                onShowTooltip={onShowTooltip}
              />
            );
          }
          return <></>;
        })}
        {isPaginationNeeded && !nextQuestions && (
          <button
            className={classes.circle}
            onClick={() => setNextQuestions((prevState) => !prevState)}
          >
            <img src={rightArrowIcon} alt="arrow" />
          </button>
        )}
      </div>
    </div>
  );
};
