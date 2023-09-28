import classes from "./exam.module.scss"
import {Button} from "../../ui/atoms/buttons/button";
import {Questions} from "../../types";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../redux/store";
import {actions} from "../../redux/examSlice";
import {useCallback, useEffect, useState} from "react";
import {Tooltip} from "../../ui/atoms/tooltip/tooltip";
import {QuestionList} from "./questionList";
import {ExamTracking} from "../examtracking/examTracking";
import {fetchExamKeywords} from "../../redux/thunks";

export interface IQuestions {
    examQuestions: Questions
}

export const Exam = ({examQuestions}: IQuestions) => {
    const dispatch: Dispatch = useDispatch();
    const [answer, setAnswer] = useState<string | undefined>(undefined);
    const [isValid, setIsValid] = useState(true);
    const [tooltipMessage, setTooltipMessage] = useState<string>("")
    const state = useSelector((state: RootState) => state.exam)

    const handleNextQuestion = () => {
        if (!answer) {
            setTooltipMessage("At least one option has to be checked.");
            setIsValid(false);
            return
        }
        if (state.type === "QUESTION") {
            setIsValid(true);
            const desiredIndex = state.answers.findIndex((item) => item.id === state.counter)

            if (desiredIndex !== -1) {
                dispatch(actions.updateAnswer({id: state.counter, currentAnswer: answer}))
                setAnswer(undefined);
                return;
            }
            dispatch(actions.saveAnswer({
                answers: [...state.answers],
                currentAnswer: answer,
            }))
            setAnswer(undefined);

            if(state.counter === examQuestions.questions.length) {
                dispatch(actions.finishExam())
            }
        }
    }


    const handlePreviousQuestion = () => {
        if (state.type === "QUESTION") {
            if (state.counter === 1) {
                setTooltipMessage("There is no previous question.")
                setIsValid(false);
                return
            }
            setIsValid(true);

            dispatch(actions.previousQuestion({
                answers: [...state.answers],
                counter: state.counter - 1,
            }))
            setAnswer(undefined);
        }
    }

    useEffect(() => {
        const showErrorTooltipCooldown = setTimeout(() => {
            setIsValid(true);
        }, 2500)

        return () => clearTimeout(showErrorTooltipCooldown);
    }, [isValid])

    return (
        <>
        <ExamTracking examQuestions={examQuestions} onShowTooltip={(message: string) => {
            setTooltipMessage(message)
            setIsValid(false)
        }}/>
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <div><h3>Question {state.type === "QUESTION" && state.counter}/{examQuestions.questions.length}</h3></div>
                <div className={classes.leave__btn}><button onClick={() => dispatch(fetchExamKeywords())}>X</button></div>
            </div>
            <QuestionList questions={examQuestions} onAnswer={useCallback((answer_: string | undefined) => setAnswer(answer_), [])} />
            <div className={classes.button__list}>
                <Button onClick={handlePreviousQuestion}>
                    previous
                </Button>
                <Button onClick={handleNextQuestion} width={100}>
                    next
                </Button>
            </div>
            {!isValid && <Tooltip isError={false} message={tooltipMessage}/>}
        </div>
        </>
    )
}