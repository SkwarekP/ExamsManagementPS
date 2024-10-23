import classes from './summary.module.scss';
import { Button } from '../../ui/atoms/buttons/button';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../redux/store';
import checkedIcon from '../../ui/atoms/icons/icons8-check-32.png';
import exitIcon from '../../ui/atoms/icons/icons8-exit-30.png';
import { useNote } from '../../hooks/useNote';
import { ExamType, IExam } from '../../types';
import { fetchExamKeywords } from '../../redux/thunks';
import { useEffect } from 'react';
import { QuestionList } from '../exam/questionList';
import { isTypeNode } from 'typescript';

interface Props {
  exam: IExam;
}

export const Summary = ({ exam }: Props) => {
  const result = useSelector((state: RootState) => {
    if (state.exam.type === 'SUMMARY') return state.exam.result;
    else return [];
  });
  const dispatch: Dispatch = useDispatch();
  // const summary = state.type === "SUMMARY";
  // const percentageResult = summary && Math.floor((state?.result?.filter((item) => item.isCorrect).length * 100) / state.result.length);
  // const name = summary && state.personalInfo.firstName;
  // const note = useNote(examType as ExamType, percentageResult as number, name as string)

  // useEffect(() => {
  //     dispatch(fetchAnswersByExamId(exam?.examId))
  // }, [])

  const mappedExamQuestionsById = exam?.questions.map((question) => {
    return { questionId: question.questionId, answers: question.answers };
  });

  const isCorrectAnswer = result.filter((item) =>
    mappedExamQuestionsById.filter(
      (examQuestion) => item.answerId === examQuestion.questionId
    )
  );

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.header__summary}>
          <h2>Your score is</h2>
          {/* <p>{state?.result?.filter((item) => item.isCorrect).length}/{state.result.length} ({Math.floor((state?.result?.filter((item) => item.isCorrect).length * 100) / state.result.length)}%)</p> */}
          {/* <span className={classes.header__summary__note}>{note}</span> */}
        </div>

        <Button onClick={() => dispatch(fetchExamKeywords())}>Try again</Button>
      </div>
      {exam.questions.map((item, index) => {
        return (
          <div className={classes.question__wrapper} key={item.questionId}>
            <div className={classes.question__header}>
              <h4>QUESTION {index + 1}</h4>
              <div className={classes.icon}>
                <img src={result ? checkedIcon : exitIcon} alt="checked" />
              </div>
            </div>
            <div className={classes.question__text}>
              <span>{item.question}</span>
            </div>
            {item.answers.map((opt) => (
              <div
                className={`${classes.option} 
                                    ${
                                      result &&
                                      result[index].correctAnswer === opt
                                        ? classes.correctAnswer
                                        : result &&
                                            result[index].correctAnswer === opt
                                          ? classes.incorrectAnswer
                                          : ''
                                    }`}
              >
                <input
                  type="radio"
                  disabled={true}
                  checked={result && result[index].correctAnswer === opt}
                  readOnly={true}
                  value={opt}
                />
                <span>{opt}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
