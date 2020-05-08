import { MutationTree } from "vuex";
import { ActivityState, Activity, Activities } from "./types";
import { Habit } from "../habit/types";
import { habit } from "../habit";
import { activity } from ".";

export const mutations: MutationTree<ActivityState> = {
  activities(state, activities: Activities) {
    state.activities = activities;
  },
  habitActivities(
    state,
    payload: { habitId: number; activities: Array<Activity> }
  ) {
    state.activities[payload.habitId] = payload.activities;
  },
  addActivity(state, payload: { habitId: string; activity: Activity }) {
    let data = state.activities[payload.habitId];
    if (!data) {
      data = [];
    }

    data.push(payload.activity);

    state.activities = {
      ...state.activities,
      [payload.habitId]: data,
    };
  },
};
