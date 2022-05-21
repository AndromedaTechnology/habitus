import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { TagState, Tag } from "./types";
import { RootState } from "../types";

export const state: TagState = {
  tags: Array<Tag>(),
  isLoading: false,
};

const namespaced = true;

export const tag: Module<TagState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
