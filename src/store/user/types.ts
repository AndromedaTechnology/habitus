export const CURRENT_USER_INITIAL_USERNAME = "you";

export interface User {
  _id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserState {
  currentUserId?: string;
  users?: Array<User>;
}

export type UserCreateDto = UserUpdateDto;
export type UserUpdateDto = Omit<User, "_id">;
