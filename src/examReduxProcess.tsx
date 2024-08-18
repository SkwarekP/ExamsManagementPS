import classes from "./examReduxProcess.module.scss"
import { Button } from "./ui/atoms/buttons/button";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "./redux/store";
import { Exam } from "./components/exam/exam";
import { Loader } from "./ui/atoms/loader/loader";
import { Form } from "./components/form/form";
import { Introduction } from "./ui/introduction/introduction";
import { Summary } from "./components/summary/summary";
import { fetchExamKeywords, fetchExam } from "./redux/thunks";
import { Error } from "./ui/error/error";
import { useEffect } from "react";

export const ExamReduxProcess = () => {
    const state = useSelector((state: RootState) => state.exam);
    const examType = useSelector((state: RootState) => state?.exam?.type);
    const dispatch: Dispatch = useDispatch();

    // const exams = dispatch(fetchExamKeywords())

    // console.log(exams);
    useEffect(() => {
        dispatch(fetchExamKeywords())
    }, [dispatch])


    switch (state.type) {
        case "QUESTION":
            switch (examType) {
                case state?.type:
                    return <Exam exam={state?.exam} />
                default:
                    return <>EXCEPTION</>
            }
        case "LOADING":
            return <Loader />
        case "FINISH_EXAM":
            switch (examType) {
                case state?.type:
                    return <Form exam={state.exam} />
                default:
                    return <></>
            }
        case "SUMMARY":
            switch (examType) {
                case state?.type:
                    return <Summary exam={state.exam} />
                default:
                    return <></>
            }
        case "EXCEPTION":
            return <Error error={state.error} />
        case "CHOOSE_EXAM":
            return <>
                <Introduction />
                <div className={classes.wrapper}>
                    {state?.keywords?.map((exam, idx) => {
                        return <Button key={idx} onClick={() => {
                            dispatch(fetchExam(exam))
                        }}>{exam}</Button>
                    })}
                </div>
            </>
        default:
            return <>OTHER</>
    }

}