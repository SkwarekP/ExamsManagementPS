import { Role } from "../types"

export interface User {
    userId: number,
    username: string,
    firstName: string,
    lastName: string,
    role: Role
}

export const MOCK_USER: User = {
    userId: 1,
    username: "PatrykS",
    firstName: "Patryk",
    lastName: "Skwara",
    role: "Admin"
}