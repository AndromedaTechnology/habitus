import { ActionTree } from "vuex";
import { ActivityState, Activity, Activities } from "./types";
import { Habit } from "../habit/types";
import { RootState } from "../types";

export const actions: ActionTree<ActivityState, RootState> = {
  fetchActivities({ commit }): any {
    // Fetch from Localstorage

    const data: string | null | undefined = localStorage.getItem("activities");
    const activities: Activities = data ? JSON.parse(data) : {};
    commit("activities", activities);
  },
  persistActivity({ state, getters, commit }, activity: Activity): any {
    // Add _id to activity

    activity._id =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    // Append
    let activities = getters["habitActivities"](activity.habitId);

    // Save
    commit("addActivity", {
      habitId: activity.habitId,
      activity: activity,
    });

    activities = getters["activities"];
    localStorage.setItem("activities", JSON.stringify(activities));
  },
  deleteActivities({ commit }): any {
    // Delete from Localstorage

    commit("activities", {});
    localStorage.removeItem("activities");
  },
  deleteHabitActivities({ getters, commit }, habit: Habit): any {
    commit("habitActivities", { habitId: habit._id, activities: [] });

    const activities = getters["activities"];
    localStorage.setItem("activities", JSON.stringify(activities));
  },
  deleteHabitActivity({ getters, commit }, activity: Activity): any {
    // TODO:
  },
};
