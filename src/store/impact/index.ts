import { Module } from "vuex";
import { RootState } from "../types";
import { ImpactState } from "./types";

export const state: ImpactState = {
  names: Array<string>("Very Small", "Small", "Medium", "Big", "Very Big"),
  colors: Array<string>("indigo", "teal", "green", "orange", "red"),
};

const namespaced = true;

export const impact: Module<ImpactState, RootState> = {
  namespaced,
  state,
};
