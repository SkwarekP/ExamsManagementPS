import classes from "./QuestionButton.module.scss";
import {actions} from "../../redux/examSlice";
import {QuestionsCorrect} from "../../types";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../redux/store";

interface Props {
    item: QuestionsCorrect
    index: number
    onShowTooltip: (message: string) => void
}

export const QuestionButton = ({item, index, onShowTooltip}: Props) => {
    const state = useSelector((state: RootState) => state.exam.type === "QUESTION" && state.exam)
    const dispatch: Dispatch = useDispatch()

    return (
        <div className={classes.step}>
            <button
                key={item.questionId}
                onClick={() => {
                    if (state) {
                        if (item.questionId > state.answers.length + 1) {
                            onShowTooltip("Impossible to show next question before answer to previous.")
                            return
                        }
                        dispatch(actions.updateCounter({counter: item.questionId}))
                    }
                }}
                className=
                    {`${classes.circle}
                    ${state && (state?.answers[index]?.id === item.questionId) && classes.filledCircle} 
                    ${state && (state.counter === item.questionId) && classes.actual}`}>
                <span>{item.questionId}</span>
            </button>
            <div className={`${classes.line} ${state && (state?.answers[index]?.id === item.questionId) && classes.filledLine}`}/>
        </div>
    )
}