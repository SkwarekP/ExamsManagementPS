import classes from './examReduxProcess.module.scss';
import { Button } from './ui/atoms/buttons/button';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from './redux/store';
import { Exam } from './components/exam/exam';
import { Loader } from './ui/atoms/loader/loader';
import { Form } from './components/form/form';
import { Introduction } from './ui/introduction/introduction';
import { Summary } from './components/summary/summary';
import { Error } from './ui/error/error';
import { useEffect, useState, useMemo } from 'react';
import { useCreateExecutionMutation, useFetchAllExamsQuery, useFetchUserQuery } from './redux/queries/ExamQueries';
import { actions } from './redux/slices/examSlice';
import { Execution, Execution_Status, IExam } from './types';
import { SNACKBAR_CONSTANTS } from './constants/snackbar-messages';
import { useSnackbar } from './hooks/useSnackbar';

export const ExamReduxProcess = () => {
  const state = useSelector((state: RootState) => state.exam);
  const examType = useSelector((state: RootState) => state?.exam?.type);
  const dispatch: Dispatch = useDispatch();
  const snackbar =  useSnackbar();

  const {
    data: exams,
    isLoading: isExamsLoading,
    isError: isExamsFetchError,
    isSuccess: isExamsFetchedSuccessfully
  } = useFetchAllExamsQuery();

  const [searchQuery, setSearchQuery] = useState('')

  const { data: user, isLoading: isUserLoading } = useFetchUserQuery({ userId: 2 });

  const [createExecution] = useCreateExecutionMutation()

  const filteredExams = useMemo(() => {
    return exams?.filter((exam) => exam.name.toLowerCase().startsWith(searchQuery)) as IExam[];
  }, [exams, searchQuery])

  useEffect(() => {
    if (isExamsFetchError) {
      snackbar.show({
        severity: 'error',
        title: SNACKBAR_CONSTANTS.FETCH_EXAMS_FAILED_TITLE
      })
    }

  }, [isExamsFetchError, snackbar])

  console.log(isExamsLoading, isUserLoading)
  const startExamHandler = (exam: IExam) => {
    if (user && isExamsFetchedSuccessfully) {
      const executionObject: Execution = {
        userId: user.userId,
        examId: exam.examId,
        currentQuestion: exam.questions[0].question,
        executionEndTime: null,
        duration: '15:00',
        score: null,
        maxScore: 30,
        passed: null,
        status: Execution_Status.IN_PROGRESS,
      }
      createExecution(executionObject)
        .unwrap()
        .then(() => dispatch(actions.startExam({ exam })))
        .catch((error) => {
          snackbar.show({
            severity: "error",
            title: error.status === 409 ? SNACKBAR_CONSTANTS.CREATE_EXECUTION_FAILED_CONFLICT : SNACKBAR_CONSTANTS.CREATE_EXECUTION_FAILED,
            content: SNACKBAR_CONSTANTS.FETCH_EXAMS_FAILED_SUBTITLE
          })
        })
    } else {
      snackbar.show({
        severity: 'error',
        title: SNACKBAR_CONSTANTS.FETCH_CURRENT_USER
      })
    }
  };

  const introduceExams: JSX.Element =
    <>
      <Introduction />
      <div className={classes.search_input__container}>
        <input type="text" className={classes.search_input} placeholder='Search by name...' onChange={(event) => setSearchQuery(event.target.value.toLowerCase())}/>
      </div>
      <div className={classes.examList}>
        {(isExamsLoading || isUserLoading) && <Loader />}
        {filteredExams?.map((exam) => (
          <div key={exam.examId} className={classes.examCard}>
            <h3>{exam.name}</h3>
            <p className={classes.examDescription}>some description of this exam</p>
            <p className={classes.examQuestions}>{exam.questions.length} questions</p>
            <Button onClick={() => startExamHandler(exam)}>Start</Button>
          </div>
        ))}
      </div>
    </>


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
      return introduceExams
    default:
      return <>OTHER</>;
  }
};
