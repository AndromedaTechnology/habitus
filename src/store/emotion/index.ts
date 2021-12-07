import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { EmotionState, Emotion } from "./types";
import { RootState } from "../types";

export const state: EmotionState = {
  emotions: Array<Emotion>(),
  isLoading: false,
};

const namespaced = true;

export const emotion: Module<EmotionState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
