import { ActionTree } from "vuex";
import { RootState } from "../types";
import { UserState, User, UserUpdateDto, UserCreateDto } from "./types";

export const LOCALSTORAGE_KEY_USERS = "users";
export const LOCALSTORAGE_KEY_CURRENT_USER_ID = "current_user_id";

export function persistUsersStore(getters: any) {
  const users: Array<User> | undefined = getters["users"];
  localStorage.setItem(LOCALSTORAGE_KEY_USERS, JSON.stringify(users));

  const currentUserId: Array<User> | undefined = getters["currentUserId"];
  localStorage.setItem(
    LOCALSTORAGE_KEY_CURRENT_USER_ID,
    JSON.stringify(currentUserId)
  );
}

export const actions: ActionTree<UserState, RootState> = {
  /**
   * Fetch CurrentUserId, Users
   */

  fetchCurrentUserId({ commit }): any {
    const itemLs: string | null = localStorage.getItem(
      LOCALSTORAGE_KEY_CURRENT_USER_ID
    );
    const currentUserId: string | undefined = itemLs
      ? JSON.parse(itemLs)
      : undefined;
    commit("setCurrentUserId", currentUserId);
  },
  fetchUsers({ commit }): any {
    const itemsLs: string | null = localStorage.getItem(LOCALSTORAGE_KEY_USERS);
    const items: Array<User> | undefined = itemsLs
      ? JSON.parse(itemsLs)
      : undefined;
    commit("setUsers", items);
  },

  /**
   * Create, Update, Delete
   */

  setCurrentUserId({ getters, commit }, id: string | undefined): any {
    commit("setCurrentUserId", id);
    persistUsersStore(getters);
  },
  createUser({ getters, commit }, data: UserCreateDto): Promise<User> {
    return new Promise((resolve, reject) => {
      const user: User = {
        _id:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        ...data,
        createdAt: new Date(),
      };
      commit("addUser", user);
      persistUsersStore(getters);
      return resolve(user);
    });
  },
  updateUser(
    { state, getters, commit },
    payload: { id: string; data: UserUpdateDto }
  ): any {
    commit("updateUser", payload);
    persistUsersStore(getters);
  },
  deleteUser({ getters, commit }, id: string): any {
    commit("removeUser", id);
    persistUsersStore(getters);
  },
};
