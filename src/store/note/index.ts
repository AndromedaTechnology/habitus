import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { NoteState } from "./types";
import { RootState } from "../types";
import { mutations } from "./mutations";

export const state: NoteState = {
  notes: [],
};

const namespaced = true;

export const note: Module<NoteState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
