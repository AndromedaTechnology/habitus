/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
import { ActionTree } from "vuex";
import { ActivityState, Activity, Activities } from "./types";
import { Habit } from "../habit/types";
import { User } from "../user/types";
import { RootState } from "../types";
import { Vue } from "vue-property-decorator";

import VueNoty from "vuejs-noty";
import "vuejs-noty/dist/vuejs-noty.css";

Vue.use(VueNoty, {
  theme: "metroui",
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
  persistActivity(
    { state, getters, commit },
    payload: { habit: Habit; user: User; amount: number }
  ): Promise<Activity> {
    return new Promise((resolve, reject) => {
      const activity: Activity = {
        _id:
          Math.random()
            .toString(36)
            .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15),
        habitId: payload.habit._id,
        userId: payload.user._id,
        amount: payload.amount,
        createdAt: new Date(),
      };

      // Commit

      commit("addActivity", {
        habitId: activity.habitId,
        activity: activity,
      });

      // Persist to LocalStorage

      const activities = getters["getActivities"]();
      localStorage.setItem("activities", JSON.stringify(activities));

      resolve(activity);
    });
  },
  deleteActivities({ commit }): any {
    // Delete from Localstorage

    commit("activities", {});
    localStorage.removeItem("activities");
  },
  deleteHabitActivities({ getters, commit }, habit: Habit): any {
    commit("habitActivities", { habitId: habit._id, activities: [] });

    const activities = getters["getActivities"]();
    localStorage.setItem("activities", JSON.stringify(activities));
  },
  updateActivity(
    { state, getters, commit },
    payload: { habit: Habit; activity: Activity; data: any }
  ): any {
    let activities = getters["getActivities"](payload.habit._id);
    activities = activities.map((element: Activity) => {
      if (element._id === payload.activity._id) {
        element = {
          ...element,
          ...payload.data,
        };
      }
      return element;
    });

    // Save to State
    commit("habitActivities", {
      habitId: payload.habit._id,
      activities: activities,
    });

    // Persist to localStorage
    activities = getters["getActivities"]();
    localStorage.setItem("activities", JSON.stringify(activities));
  },
  deleteHabitActivity(
    { getters, commit },
    payload: { habit: Habit; activity: Activity }
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let activities = getters["getActivities"](payload.habit._id);
      activities = activities.filter((element: Activity) => {
        return element._id !== payload.activity._id;
      });

      // Save to State
      commit("habitActivities", {
        habitId: payload.habit._id,
        activities: activities,
      });

      // Persist to localStorage
      activities = getters["getActivities"]();
      localStorage.setItem("activities", JSON.stringify(activities));

      resolve();
    });
  },
};
