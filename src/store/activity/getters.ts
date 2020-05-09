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
    return activities[habitId];
  },
  heatmapHabitActivities(state) {
    return (habitId: number): Array<Activity> | undefined => {
      const { activities } = state;
      let data = activities[habitId];

      if (!data) return undefined;

      data = data.map((element) => {
        element.date = element.createdAt;
        element.count = element.amount;
        return element;
      });

      // TODO: merge same dates

      return data;
    };
  },
};
