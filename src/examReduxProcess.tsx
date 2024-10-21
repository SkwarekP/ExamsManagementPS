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
import { useCreateExecutionMutation, useFetchExamQuery } from './redux/queries/ExamQueries';
import {useFetchUsersQuery} from "./redux/queries/UserQueries";
import { actions } from './redux/slices/examSlice';
import { IExam } from './types';

export const ExamReduxProcess = () => {
  const state = useSelector((state: RootState) => state.exam);
  const examType = useSelector((state: RootState) => state?.exam?.type);
  const dispatch: Dispatch = useDispatch();
  const {
    data: ChoosenExamData,
    isLoading,
    isSuccess,
  } = useFetchExamQuery({ examName: 'React' });
  // const exams = dispatch(fetchExamKeywords())

  const users = useFetchUsersQuery();
  const createExecution = useCreateExecutionMutation()

  // console.log(exams);
  useEffect(() => {
    dispatch(fetchExamKeywords());
  }, [dispatch]);

  const startExam = (exam: string) => {
    //@TODO CREATE EXECUTION HERE

    dispatch(actions.startExam({ exam: ChoosenExamData as IExam }));
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
