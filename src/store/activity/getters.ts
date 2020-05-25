import { GetterTree } from "vuex";
import { ActivityState, Activity, Activities } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<ActivityState, RootState> = {
  getActivities: (state) => (
    habitId: string | null = null,
    descending = false
  ): Activities | Array<Activity> | undefined => {
    let activities: Activities | Array<Activity> | undefined = state.activities;

    if (habitId) {
      activities = activities[habitId] ? activities[habitId] : [];

      activities = activities.slice().sort(function(a, b) {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        if (descending === true) {
          return dateA > dateB ? -1 : 1;
        } else {
          return dateA > dateB ? 1 : -1;
        }
      });
    }

    return activities;
  },
};
