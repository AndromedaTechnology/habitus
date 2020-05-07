import { GetterTree } from "vuex";
import { UserState, User } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<UserState, RootState> = {
  user(state): User | undefined {
    const { user } = state;
    return user;
  },
};
