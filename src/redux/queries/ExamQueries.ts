import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IExam } from '../../types';

export const examApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3002/'
    }),
    tagTypes: ['Exam'],
    endpoints: (builder) => ({
        fetchExam: builder.query<IExam, {examName: string}>({ 
            query: ({examName}): string => `exams/name/${examName}`,
            providesTags: ["Exam"]
        })
    })
})

export const {useFetchExamQuery} = examApi