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
  ): any {
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

    // Notification

    if (payload.habit.isGood) {
      const audio = new Audio("/audio/notificationGood.ogg");
      audio.play();
      (Vue as any).noty.success(activity.amount + " good experience gained!");
    } else {
      const audio = new Audio("/audio/notificationBad.ogg");
      audio.play();
      (Vue as any).noty.error(activity.amount + " bad experience gained!");
    }

    // Save
    commit("addActivity", {
      habitId: activity.habitId,
      activity: activity,
    });

    // Persist to LocalStorage
    const activities = getters["getActivities"]();
    localStorage.setItem("activities", JSON.stringify(activities));
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
  deleteHabitActivity(
    { getters, commit },
    payload: { habit: Habit; activity: Activity }
  ): any {
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
  },
};
