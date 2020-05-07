import { ActionTree } from "vuex";
import { UserState, User } from "./types";
import { RootState } from "../types";

export const actions: ActionTree<UserState, RootState> = {
  fetchUser({ commit }): any {
    // Fetch from Localstorage

    const userLocalStorage: string | null = localStorage.getItem("user");
    const user: User | undefined = userLocalStorage
      ? JSON.parse(userLocalStorage)
      : undefined;

    commit("setUser", user);
  },
  persistUser({ commit }, user: User): any {
    // Persist to Localstorage

    localStorage.setItem("user", JSON.stringify(user));
  },
  deleteUser({ commit }): any {
    // Delete from Localstorage

    localStorage.removeItem("user");
  },
};
