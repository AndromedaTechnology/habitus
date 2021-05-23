import { MutationTree } from "vuex";
import { UserState, User, UserUpdateDto } from "./types";

export const mutations: MutationTree<UserState> = {
  setCurrentUserId(state, payload: string | undefined) {
    state.currentUserId = payload;
  },
  setUsers(state, payload: Array<User> | undefined) {
    state.users = payload;
  },
  addUser(state, payload: User) {
    state.users = [...(state.users ?? []), payload];
  },
  updateUser(state, payload: { id: string; data: UserUpdateDto }) {
    state.users = state.users?.map((user: User) => {
      if (user._id === payload.id) {
        return {
          ...user,
          ...payload.data,
        };
      }
      return user;
    });
  },
  removeUser(state, id: string) {
    state.users = state.users?.filter((user: User) => {
      return user._id !== id;
    });
  },
};
