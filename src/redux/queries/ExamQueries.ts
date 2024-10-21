import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AllCorrectAnswers, Execution, IExam } from '../../types';

export const examApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3002/',
  }),
  reducerPath: 'examApi',
  tagTypes: ['Exam', 'Execution'],
  endpoints: (builder) => ({
    fetchAllExams: builder.query<IExam[], void>({
      query: () => '/exams',
      providesTags: ['Exam'],
    }),
    fetchExam: builder.query<IExam, { examName: string }>({
      query: ({ examName }) => `exams/name/${examName}`,
      providesTags: ['Exam'],
    }),
    fetchAnswersByExamId: builder.query<
      AllCorrectAnswers[],
      { examId: number }
    >({
      query: ({ examId }) => `answers/exam/${examId}`,
    }),
    createExecution: builder.mutation({
      query: (newExecution: Execution) => ({
        url: '/executions',
        method: 'POST',
        body: newExecution,
      }),
    }),
  }),
});

export const {
  useFetchExamQuery,
  useFetchAnswersByExamIdQuery,
  useCreateExecutionMutation,
} = examApi;
