import { MutationTree } from "vuex";
import { UserState, User } from "./types";

export const mutations: MutationTree<UserState> = {
  setUser(state, payload: User) {
    state.user = payload;
  },
};
