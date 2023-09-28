import {createSlice} from "@reduxjs/toolkit";
import {ExamState, IAnswer, IPersonalInfo, IResult, Questions} from "../types";
import {AxiosError} from "axios";

export const examSlice = createSlice({
    name: "exam",
    initialState: {
        type: "CHOOSE_EXAM",
    } as ExamState,
    reducers: {
        loading: state => ({type: "LOADING"}),
        finishExam: (state) => {
            if(state.type === "QUESTION"){
                const answers_ = [...state.answers]
                return {
                    type: "FINISH_EXAM",
                    result: answers_,
                    questions: state.questions
                }
            }
        },
        summary: (state, action: {
            payload: {
                personalInfo: IPersonalInfo,
                result: IResult[],
            }
        }) => {
            if(state.type === "FINISH_EXAM"){
                return {
                    type: "SUMMARY",
                    result: action.payload.result,
                    personalInfo: action.payload.personalInfo,
                    questions: state.questions
                }
            }
        },
        startExam: (state, action: {
            payload: {
                questions: Questions
            }
        }) => (
            {type: "QUESTION", answers: [], counter: 1, questions: action.payload.questions}
        ),
        chooseExam: (state, action: {
            payload: {
                exams: string[]
            }
        }) => ({type: "CHOOSE_EXAM", exams: action.payload.exams}),
        exam: (state, action: {
            payload: {
                answers: IAnswer[],
                counter: number,
                currentAnswer?: string
                questions: Questions
            }
        }) => ({
            type: "QUESTION",
            ...action.payload
        }),
        previousQuestion: (state, action: {
            payload: {
                answers: IAnswer[],
                counter: number,
                currentAnswer?: string,
            }}) => {
            if(state.type === "QUESTION"){
                return {
                    type: "QUESTION",
                    ...action.payload,
                    questions: state.questions
                }
            }
        },
        saveAnswer: (state, action: {
            payload: {
                answers: IAnswer[],
                currentAnswer?: string,
            }}) => {
            if(state.type === "QUESTION") {
                    const answers_ = [...state.answers];
                    answers_.push({id: state.counter, answer: action.payload.currentAnswer})
                    return {
                        type: "QUESTION",
                        counter: state.counter + 1,
                        answers: answers_,
                        answer: action.payload.currentAnswer,
                        questions: state.questions
                    }
            }
        },
        updateAnswer: (state, action: {payload: {
            id: number,
            currentAnswer: string | undefined,
            }}) => {
            if(state.type === "QUESTION"){
                return {
                    ...state,
                    counter: state.counter + 1,
                    answers: state.answers.map((item) => {
                        if(item.id === action.payload.id) {
                            return {id: item.id, answer: action.payload.currentAnswer}
                        }
                        return {...item}
                    })
                }
            }
        },
        updateCounter: (state, action: {
            payload: {
                counter: number
            }
        }) => {
            if(state.type === "QUESTION"){
                return {
                    ...state,
                    counter: action.payload.counter
                }
            }
        },
        catchException: (state, action: {
            payload: {
                error: AxiosError
            }
        }) => ({type: "EXCEPTION", error: action.payload.error})
    }

})

export const actions = examSlice.actions;