import { GetterTree } from "vuex";
import { ActivityState, Activity, Activities } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<ActivityState, RootState> = {
  activities(state): Activities | undefined {
    const { activities } = state;
    return activities;
  },
  habitActivities(state) {
    return (habitId: number): Array<Activity> | undefined => {
      const { activities } = state;
      return activities[habitId];
    };
  },
};
