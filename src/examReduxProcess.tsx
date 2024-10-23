import classes from './examReduxProcess.module.scss';
import { Button } from './ui/atoms/buttons/button';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from './redux/store';
import { Exam } from './components/exam/exam';
import { Loader } from './ui/atoms/loader/loader';
import { Form } from './components/form/form';
import { Introduction } from './ui/introduction/introduction';
import { Summary } from './components/summary/summary';
import { fetchExamKeywords } from './redux/thunks';
import { Error } from './ui/error/error';
import { useEffect } from 'react';
import { useCreateExecutionMutation, useFetchExamQuery, useFetchUserQuery } from './redux/queries/ExamQueries';
import { actions } from './redux/slices/examSlice';
import { Execution, Execution_Status, IExam } from './types';
import { useSnackbar } from './hooks/useSnackbar';
import { SNACKBAR_CONSTANTS } from './constants/snackbar-messages';

export const ExamReduxProcess = () => {
  const state = useSelector((state: RootState) => state.exam);
  const examType = useSelector((state: RootState) => state?.exam?.type);
  const dispatch: Dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {
    data: examData,
    isLoading: isExamDataLoading,
    isError: isExamDataError,
  } = useFetchExamQuery({ examName: 'React' });
  const {data:user, isLoading:isUserLoading, isError: isFetchingUserError} = useFetchUserQuery({userId: 1});
  const [createExecution, { isLoading: isCreatingExecution, isError:isCreateExecutionFailed }] = useCreateExecutionMutation()

  useEffect(() => {
    dispatch(fetchExamKeywords());
  }, [dispatch]);

  const startExam = (exam: string) => {
    //@TODO CREATE EXECUTION HERE
    const executionObject: Execution = {
      userId: user?.userId as number,
      examId: 1,
      currentQuestion: '',
      startTime: '',
      endTime: '',
      duration: '15:00',
      score: null,
      maxScore: 30,
      passed: null,
      status: Execution_Status.IN_PROGRESS,
    } 
    createExecution(executionObject)
      .unwrap()
      .then(() => snackbar.show({
        severity: "success",
        message: SNACKBAR_CONSTANTS.CREATE_EXECUTION_SUCCESS
      }))
      .catch(() => snackbar.show({
          severity: "error",
          message: SNACKBAR_CONSTANTS.CREATE_EXECUTION_FAILED
        })
      )

    dispatch(actions.startExam({ exam: examData as IExam }));
  };

  switch (state.type) {
    case 'QUESTION':
      switch (examType) {
        case state?.type:
          return <Exam exam={state?.exam} />;
        default:
          return <>EXCEPTION</>;
      }
    case 'LOADING':
      return <Loader />;
    case 'FINISH_EXAM':
      switch (examType) {
        case state?.type:
          return <Form exam={state.exam} />;
        default:
          return <></>;
      }
    case 'SUMMARY':
      switch (examType) {
        case state?.type:
          return <Summary exam={state.exam} />;
        default:
          return <></>;
      }
    case 'EXCEPTION':
      return <Error error={state.error} />;
    case 'CHOOSE_EXAM':
      return (
        <>
          <Introduction />
          <div className={classes.wrapper}>
            {state?.keywords?.map((exam, idx) => {
              return (
                <Button key={idx} onClick={() => startExam(exam)}>
                  {exam}
                </Button>
              );
            })}
          </div>
        </>
      );
    default:
      return <>OTHER</>;
  }
};
