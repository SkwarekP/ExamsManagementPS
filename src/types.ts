import { ReactNode } from 'react';
import { AxiosError } from 'axios';
import {
  AnswersAmount,
  ExamTime,
  QuestionsAmount,
} from './ui/modal/addExamModal';
export interface IChildrenProps {
  children: ReactNode;
}

type statusType = 'Shared' | 'Private' | 'Public';

type ExamStatus = 'PENDING' | 'DONE';

export interface QuestionsCorrect {
  questionId: number;
  question: string;
  answers: string[];
}
export interface IExam {
  examId: number;
  time: number | undefined;
  createdAt: string;
  level: number;
  questionsAmount: number;
  answersAmount: number;
  name: string;
  category: string;
  status?: ExamStatus;
  questions: QuestionsCorrect[];
}
export interface IQuestions {
  examType?: string | ExamType;
  questions: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  createdAt?: string;
  category?: string;
  time?: string;
  difficultyLevel?: number;
  questionsAmount?: QuestionsAmount;
  answersAmount?: AnswersAmount;
  status?: statusType;
}

interface IAnswers {
  answerId: number;
  answer: string | undefined;
  isCorrect: boolean;
}

interface Questions {
  id: number;
  question: string | undefined;
  options: IAnswers[];
  correctAnswer: string | undefined;
}

export interface INewExamData {
  questions: Questions[];
  questionsCounter: number;
  examType?: string | undefined;
  category: string | undefined;
  difficultyLevel: number | undefined;
  questionsAmount: QuestionsAmount;
  answersAmount: AnswersAmount | undefined;
  examTime: ExamTime;
}

export interface IQuestionsItem {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface IAnswer {
  id: number;
  answer: string | undefined;
}

export interface AllCorrectAnswers {
  answerId: number;
  correctAnswer: string;
}

export interface IResult extends IAnswer {
  isCorrect: boolean;
}

export type ExamType =
  | 'REACTJS'
  | 'JAVASCRIPT'
  | 'CSS'
  | 'ANGULAR'
  | 'VUE'
  | 'CPP'
  | 'PYTHON'
  | 'JAVA'
  | 'SEESHARP'
  | 'RUBY'
  | 'SWIFT'
  | 'GO'
  | 'R'
  | 'PHP'
  | 'KOTLIN'
  | 'TYPESCRIPT'
  | 'RUST'
  | 'PERL'
  | 'SCALA'
  | 'FSHARP'
  | 'HASKELL'
  | 'OBJECTIVE_C'
  | 'SQL'
  | 'FLUTTER'
  | 'SCSS'
  | 'NEXTJS'
  | 'C'
  | 'DART';

export type Gender = 'Male' | 'Female' | 'Prefer not say';

export interface IPersonalInfo {
  firstName: string | undefined;
  emailAddress: string | undefined;
  gender: Gender;
}

export type ExecutionStatus = 'IN_PROGRESS' | 'COMPLETED' | 'DECLINED';

export type Role = "Admin" | "Participant"

export enum Execution_Status {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DECLINED = 'DECLINED',
}
export type ExamState =
  | {
      type: 'CHOOSE_EXAM';
      keywords: string[];
    }
  | {
      type: 'MANAGE_EXAMS';
      existingExams: IQuestions[];
    }
  | {
      type: 'LOADING';
    }
  | {
      type: 'EXAM_PROCESS';
      answers: IAnswer[];
      counter: number;
      answer?: string;
      exam: IExam;
    }
  | {
      type: 'EXCEPTION';
      error: AxiosError;
    }
  | {
      type: 'FINISH_EXAM';
      result: IAnswer[];
      exam: IExam;
    }
  | {
      type: 'SUMMARY';
      // personalInfo: IPersonalInfo
      result: AllCorrectAnswers[];
      exam: IExam;
    };

export interface Execution {
  executionId: string | null;
  userId: number;
  examId: number;
  currentQuestion?: string;
  startTime?: string; // should be created at the backend
  executionEndTime?: string | null; // should be created at the backend
  duration?: string;
  score?: number | null;
  maxScore: number;
  passed: boolean | null;
  status: ExecutionStatus;
  createdAt?: string; //should be created at the backend
  updatedAt?: string; // should be created at the backend
}

export interface CreateExecution {
  userId: number;
  examId: number;
  currentQuestion?: string;
  startTime?: string; // should be created at the backend
  executionEndTime?: string | null; // should be created at the backend
  duration?: string;
  score?: number | null;
  maxScore: number;
  passed: boolean | null;
  status: ExecutionStatus;
  createdAt?: string; //should be created at the backend
  updatedAt?: string; // should be created at the backend
}

export interface UpdateAnswers {
  questionId: number,
  answer: string
}

export interface UpdateExeuction {
  userId?: number;
  currentQuestion: string;
  answeredQuestionsAmount: number;
  answers: UpdateAnswers;
  passed?: boolean;
}
