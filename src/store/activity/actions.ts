/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
import { ActionTree } from "vuex";
import { ActivityState, Activity, Activities } from "./types";
import { Habit } from "../habit/types";
import { RootState } from "../types";
import { Vue } from "vue-property-decorator";

import VueNoty from "vuejs-noty";
import "vuejs-noty/dist/vuejs-noty.css";

Vue.use(VueNoty, {
  theme: "semanticui",
  layout: "bottomRight",
  sounds: {
    sources: ["/audio/notification.mp3"],
  },
});

export const actions: ActionTree<ActivityState, RootState> = {
  fetchActivities({ commit }): any {
    // Fetch from Localstorage

    const data: string | null | undefined = localStorage.getItem("activities");
    const activities: Activities = data ? JSON.parse(data) : {};
    commit("activities", activities);
  },
  persistActivity({ state, getters, commit }, activity: Activity): any {
    // Add _id

    activity._id =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    // Add createdAt
    activity.createdAt = new Date();

    // Append
    let activities = getters["habitActivities"](activity.habitId);

    // Save
    commit("addActivity", {
      habitId: activity.habitId,
      activity: activity,
    });

    activities = getters["activities"];
    localStorage.setItem("activities", JSON.stringify(activities));

    // Notification
    (Vue as any).noty.success(activity.amount + " experience gained!");
    const audio = new Audio("/audio/notification.ogg");
    audio.play();
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
  deleteHabitActivity(
    { getters, commit },
    payload: { habit: Habit; activity: Activity }
  ): any {
    let activities = getters["habitActivities"](payload.habit._id);
    activities = activities.filter((element: Activity) => {
      return element._id !== payload.activity._id;
    });

    // Save to State
    commit("habitActivities", {
      habitId: payload.habit._id,
      activities: activities,
    });

    // Persist to localStorage
    activities = getters["activities"];
    localStorage.setItem("activities", JSON.stringify(activities));
  },
};
