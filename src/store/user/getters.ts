import { GetterTree } from "vuex";
import { UserState } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<UserState, RootState> = {
  fullName(state): string {
    const { user } = state;
    const firstName = (user && user.firstName) || "";
    const lastName = (user && user.lastName) || "";
    return `${firstName} ${lastName}`;
  },
};
