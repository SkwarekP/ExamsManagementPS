import classes from './exam.module.scss';
import { Button } from '../../ui/atoms/buttons/button';
import { IAnswer, IExam, UpdateExeuction } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../redux/store';
import { actions } from '../../redux/slices/examSlice';
import { useCallback, useEffect, useState } from 'react';
import { Snackbar } from '../../ui/snackbar/snackbar';
import { QuestionList } from './questionList';
import { ExamTracking } from '../examtracking/examTracking';
import { fetchExamKeywords } from '../../redux/thunks';
import { ModalWarning } from '../../ui/modal/modal';
import { createPortal } from 'react-dom';
import { Backdrop } from '../../ui/modal/backdrop';
import { Error } from '../../ui/error/error';
import crossIcon from '../../ui/atoms/icons/cross.png';
import { useUpdateExecutionMutation } from '../../redux/queries/ExamQueries'
import { useSnackbar } from '../../hooks/useSnackbar';
import { SNACKBAR_CONSTANTS } from '../../constants/snackbar-messages';

export interface Props {
  exam: IExam;
}

interface ISavedUpdated {
  isSaved: boolean;
  isUpdated: boolean;
}

interface QuestionState {
  type: "EXAM_PROCESS";
  answers: IAnswer[];
  counter: number;
  answer?: string;
  exam: IExam;
}

export const Exam = ({ exam }: Props) => {
  const dispatch: Dispatch = useDispatch();
  const snackbar = useSnackbar();
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isSavedOrUpdated, setIsSavedOrUpdated] = useState<ISavedUpdated>({
    isSaved: false,
    isUpdated: false,
  });
  const [tooltipMessage, setTooltipMessage] = useState<string>('');
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const state = useSelector((state: RootState) => {
    if (state.exam.type === "EXAM_PROCESS") return state.exam
  }) as QuestionState;

  const executionState = useSelector((state: RootState) => state.execution)

  const [updateExecution, { isLoading: isExecutionUpdated, isError: IsExecutionUpdateError }] = useUpdateExecutionMutation();

  const handleModal = () => dispatch(fetchExamKeywords());
  const closeModal = () => setIsModalShown(false);

  const handleNextQuestion = () => {
    if (isSavedOrUpdated.isSaved || isSavedOrUpdated.isUpdated) return;

    if (!answer) {
      snackbar.show({
        title: SNACKBAR_CONSTANTS.SAVE_EMPTY_ANSWER,
        severity: 'error'
      })
      return;
    }
    setIsValid(true);
    const desiredIndex = state.answers.findIndex(
      (item) => item.id === state.counter
    );

    if (desiredIndex !== -1) {
      dispatch(
        actions.updateAnswer({ id: state.counter, currentAnswer: answer })
      );
      setAnswer(undefined);
      setTooltipMessage('The answer has been updated.');
      setIsSavedOrUpdated({ ...isSavedOrUpdated, isUpdated: true });
      return;
    }
    dispatch(
      actions.saveAnswer({
        answers: [...state.answers],
        currentAnswer: answer,
      })
    );
    setAnswer(undefined);
    setTooltipMessage('The answer has been saved.');
    setIsSavedOrUpdated({ ...isSavedOrUpdated, isSaved: true });

    if (state.counter === exam?.questionsAmount) {
      dispatch(actions.finishExam());
    }

    const updateExecutionData: UpdateExeuction = {
      userId: 2,
      currentQuestion: exam.questions[state.counter - 1].question,
      answeredQuestionsAmount: 1,
      answers: {
        questionId: exam.questions[state.counter - 1].questionId,
        answer: answer
      }
    }

    if (!executionState.executionId) {
      return snackbar.show({
        title: 'something went wrong ',
        content: 'There was some problem while getting an execution',
        severity: 'error',
      })
    }

    updateExecution({
      execution: updateExecutionData,
      executionId: executionState.executionId
    })
      .unwrap()
      .then(() => {
        snackbar.show({
          title: SNACKBAR_CONSTANTS.UPDATE_EXECUTION_SUCCESS,
          severity: 'success'
        })
      })
      .catch(() => {
        snackbar.show({
          title: SNACKBAR_CONSTANTS.UPDATE_EXECUTION_FAILED,
          severity: 'error'
        })
      })


  };

  const handlePreviousQuestion = () => {
    if (isSavedOrUpdated.isSaved || isSavedOrUpdated.isUpdated) return;
    if (state.counter === 1) {
      setTooltipMessage('There is no previous question.');
      setIsValid(false);
      return;
    }
    setIsValid(true);

    dispatch(
      actions.previousQuestion({
        answers: [...state.answers],
        counter: state.counter - 1,
      })
    );
    setAnswer(undefined);
  };

  useEffect(() => {
    const showErrorTooltipCooldown = setTimeout(() => {
      setIsValid(true);
      setIsSavedOrUpdated((prevState) => {
        if (prevState.isUpdated)
          return { ...isSavedOrUpdated, isUpdated: false };
        if (prevState.isSaved) return { ...isSavedOrUpdated, isSaved: false };
        return { ...isSavedOrUpdated };
      });
    }, 1000);

    return () => clearTimeout(showErrorTooltipCooldown);
    // eslint-disable-next-line
  }, [isValid, isSavedOrUpdated.isSaved, isSavedOrUpdated.isUpdated]);

  const onAnswer = useCallback(
    (answer_: string | undefined) => setAnswer(answer_),
    []
  );

  return (
    <>
      {exam ? (
        <>
          <ExamTracking
            exam={exam}
            onShowTooltip={(message: string) => {
              setTooltipMessage(message);
              setIsValid(false);
            }}
          />
          <div className={classes.wrapper}>
            <div className={classes.header}>
              <div>
                <h3>
                  Question {state.counter}/
                  {exam?.questions?.length}
                </h3>
              </div>
              <div className={classes.leave__btn}>
                <button onClick={() => setIsModalShown(true)}>
                  <img src={crossIcon} alt="crossIcon" />
                </button>
              </div>
            </div>
            <QuestionList exam={exam} onAnswer={onAnswer} />
            <div className={classes.button__list}>
              <Button onClick={handlePreviousQuestion}>previous</Button>
              <Button onClick={handleNextQuestion} width={75}>
                next
              </Button>
            </div>
            {isModalShown &&
              createPortal(
                <ModalWarning onConfirm={handleModal} onClose={closeModal} />,
                document.getElementById('modal')!
              )}
            {isModalShown &&
              createPortal(
                <Backdrop onClose={closeModal} />,
                document.getElementById('backdrop')!
              )}
            {!isValid && <Snackbar />}
            {(isSavedOrUpdated.isSaved || isSavedOrUpdated.isUpdated) && (
              <Snackbar />
            )}
          </div>
        </>
      ) : (
        <Error alternativeMessage={'There is no data in database.'} />
      )}
    </>
  );
};
