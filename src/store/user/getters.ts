import { GetterTree } from "vuex";
import { RootState } from "../types";
import { UserState, User } from "./types";

export const getters: GetterTree<UserState, RootState> = {
  currentUserId(state): string | undefined {
    const { currentUserId } = state;
    return currentUserId;
  },
  currentUser(state): User | undefined {
    const { currentUserId, users } = state;
    const currentUser = users?.find((user) => user._id === currentUserId);
    return currentUser;
  },
  users(state): Array<User> | undefined {
    const { users } = state;
    return users;
  },
};
