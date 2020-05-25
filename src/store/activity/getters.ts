import { GetterTree } from "vuex";
import { ActivityState, Activity, Activities } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<ActivityState, RootState> = {
  getActivities: (state) => (
    habitId: string | null = null,
    descending = false,
    dateStart: Date | null = null,
    dateEnd: Date | null = null
  ): Activities | Array<Activity> | undefined => {
    let activities: Activities | Array<Activity> | undefined = state.activities;

    if (habitId) {
      activities = activities[habitId] ? activities[habitId] : [];

      // Filter by date

      activities = activities.filter((element) => {
        let valid = true;
        const createdAt = new Date(element.createdAt);

        if (dateStart && dateStart.getTime() < createdAt.getTime())
          valid = false;
        if (dateEnd && dateEnd.getTime() < createdAt.getTime()) valid = false;

        return valid;
      });

      // Sort ASC or DESC

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
