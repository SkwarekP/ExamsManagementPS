import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AllCorrectAnswers, CreateExecution, Execution, IExam, UpdateExeuction } from '../../types';
import { User } from '../../mocks/user.utils';

export const examApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3002/',
  }),
  reducerPath: 'examApi',
  tagTypes: ['Exam', 'Execution', 'Users'],
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
      query: (newExecution: CreateExecution) => ({
        url: '/executions',
        method: 'POST',
        body: newExecution,
      }),
    }),
    updateExecution: builder.mutation<void, {execution: UpdateExeuction, executionId: string}>({
      query: ({execution, executionId}) => ({
        url: `/executions/execution/${executionId}`,
        method: 'PATCH',
        body: execution,
      })
    }),
    fetchUsers: builder.query<User[], void>({
      query: () => '',
      providesTags: ['Users'],
    }),
    fetchUser: builder.query<User, { userId: number }>({
      query: ({ userId }) => `/users/${userId}`,
      providesTags: ['Users'],
    }),
  }),
});

export const {
  useFetchAllExamsQuery,
  useFetchExamQuery,
  useFetchAnswersByExamIdQuery,
  useCreateExecutionMutation,
  useUpdateExecutionMutation,
  useFetchUsersQuery,
  useFetchUserQuery
} = examApi;
