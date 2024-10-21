// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
// import { User } from "../../mocks/user.utils";


// export const usersApi = createApi({
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:3002/users'
//     }),
//     reducerPath: 'usersApi',
//     tagTypes: ["Users"],
//     endpoints: (builder) => ({
//         fetchUsers: builder.query<User[], void>({
//             query: () => '',
//             providesTags: ["Users"]
//         }),
//         fetchUser: builder.query<User, {userId: number}>({
//             query: ({userId}) => `/${userId}`,
//             providesTags: ["Users"]
//         }),
//     })
// });
// export const { useFetchUsersQuery, useFetchUserQuery } = usersApi;
