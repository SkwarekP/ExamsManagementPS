import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AllCorrectAnswers, Execution, IExam } from '../../types';
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
      query: (newExecution: Execution) => ({
        url: '/executions',
        method: 'POST',
        body: newExecution,
      }),
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
  useFetchExamQuery,
  useFetchAnswersByExamIdQuery,
  useCreateExecutionMutation,
  useFetchUsersQuery,
  useFetchUserQuery
} = examApi;
