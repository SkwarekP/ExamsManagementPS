import classes from './QuestionButton.module.scss';
import { actions } from '../../redux/slices/examSlice';
import { QuestionsCorrect } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../redux/store';

interface Props {
  item: QuestionsCorrect;
  index: number;
  onShowTooltip: (message: string) => void;
}

export const QuestionButton = ({ item, index, onShowTooltip }: Props) => {
  const state = useSelector(
    (state: RootState) => state.exam.type === 'QUESTION' && state.exam
  );
  const dispatch: Dispatch = useDispatch();

  return (
    <div className={classes.step}>
      <button
        key={item.questionId}
        onClick={() => {
          if (state) {
            if (index > state.answers.length + 1) {
              onShowTooltip(
                'Impossible to show next question before answer to previous.'
              );
              return;
            }
            dispatch(actions.updateCounter({ counter: index }));
          }
        }}
        className={`${classes.circle}
                    ${state && state?.answers[index]?.id === index && classes.filledCircle} 
                    ${state && state.counter === index + 1 && classes.actual}`}
      >
        <span>{index + 1}</span>
      </button>
      <div
        className={`${classes.line} ${state && state?.answers[index]?.id === index && classes.filledLine}`}
      />
    </div>
  );
};
