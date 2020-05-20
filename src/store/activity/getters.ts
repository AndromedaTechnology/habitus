import { GetterTree } from "vuex";
import { ActivityState, Activity, Activities } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<ActivityState, RootState> = {
  activities(state): Activities | undefined {
    const { activities } = state;
    return activities;
  },
  habitActivities: (state) => (
    habitId: number
  ): Array<Activity> | undefined => {
    const { activities } = state;
    const habitActivities = activities[habitId];
    if (!habitActivities) return undefined;

    return habitActivities.sort(function(a, b) {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA > dateB ? -1 : 1;
    });
  },
};
