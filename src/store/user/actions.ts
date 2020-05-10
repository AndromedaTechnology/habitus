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
  updateUser(
    { state, getters, commit },
    payload: { user: User; data: any }
  ): any {
    commit("updateUser", payload);

    // Save
    const user = getters["user"];
    localStorage.setItem("user", JSON.stringify(user));
  },
  persistUser({ commit }, user: User): any {
    // Add _id to user

    user._id =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    // Persist to Localstorage

    localStorage.setItem("user", JSON.stringify(user));
  },
  deleteUser({ commit }): any {
    // Delete from Localstorage

    localStorage.removeItem("user");
  },
};
