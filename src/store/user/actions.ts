import { ActionTree } from "vuex";
import { UserState, User } from "./types";
import { RootState } from "../types";

export const actions: ActionTree<UserState, RootState> = {
  fetchUser({ commit }): any {
    // TODO: Fetch from Localstorage

    const user: User = {
      firstName: "Mario",
      lastName: "Novak",
    };

    commit("setUser", user);
  },
  persistUser({ commit }): any {
    // TODO: Persist to Localstorage
  },
};
