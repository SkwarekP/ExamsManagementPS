import classes from "./DataTable.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../redux/store";
import {useEffect} from "react";
import {ExamState} from "../../types";
import {Loader} from "../atoms/loader/loader";
import filledStarIcon from "../atoms/icons/filledStar.svg";
import starIcon from "../atoms/icons/star.svg";

const headers: string[] = ["ID", "Category", "Exam's name", "Questions amount", "Status", "Time", "Difficulty", "Created at"]
const stars: number[] = [1, 2, 3, 4, 5];

export const DataTable = () => {

    const dispatch: Dispatch = useDispatch();
    const state: ExamState = useSelector((state: RootState) => state.exam);
    const examsListState = useSelector((state: RootState) => state.examsList)

    // useEffect(() => {
    //     // if(state.type === "CHOOSE_EXAM") return
    //     if (examsListState.length !== 0) return

    //     dispatch(fetchExamKeywords2())
    // }, [examsListState, dispatch])

    // useEffect(() => {
    //     dispatch(fetchAllExams(examsListState))
    // }, [examsListState, dispatch])

    return (
        <div className={classes.wrapper}>
            {headers.map((header, idx) => {
                return (
                    <div className={classes.row}>
                        <div className={classes.header}>
                            <h3>{header}</h3>
                        </div>
                        {state.type === "MANAGE_EXAMS" ? state?.existingExams?.map((item, index) => {
                            return <div className={classes.value}>
                                {idx === 0 && <span> {index + 1} </span>}
                                {idx === 1 && <span> {item?.category ? item?.category.toUpperCase() : "---"}</span>}
                                {idx === 2 && <span> {item?.examType ? item?.examType : "---"}</span>}
                                {idx === 3 && <span> {item?.questions?.length ? item?.questions?.length : "---"}</span>}
                                {idx === 4 && <span> {item?.status ? item?.status.toUpperCase() : "---"}</span>}
                                {idx === 5 && <span> {item?.time ? item?.time.toUpperCase() : "---"}</span>}
                                {idx === 6 && <span> {item?.difficultyLevel ?
                                    <div className={classes.starsWrapper}>
                                        {stars.map((star) => {
                                                    if(star <= item.difficultyLevel!) {
                                                        return <img src={filledStarIcon} alt="Filled star" />
                                                    }
                                                   return <img src={starIcon}  alt="Star Icon"/>
                                                })}
                                    </div> :
                                    "---"}
                                </span>}
                                {idx === 7 && <span> {item?.createdAt ? item?.createdAt.toUpperCase() : "---"}</span>}
                            </div>
                        }) : <Loader/>}
                    </div>
                )
            })}
        </div>
    )
}