import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../mocks/user.utils";

export const usersSlice = createSlice({
    name: 'examList',
    initialState: [] as User[],
    reducers: {
      setUsers(state, action) {
        return [] 
      }
    },
  });