/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
import {
  Activity,
  ActivityState,
  ActivityUpdateDto,
  ActivityCreateDto,
} from "./types";
import { ActionTree } from "vuex";
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

export const LOCALSTORAGE_KEY_ACTIVITIES = "activities";

export const actions: ActionTree<ActivityState, RootState> = {
  fetchActivities({ commit }): any {
    const data: string | null | undefined = localStorage.getItem(
      LOCALSTORAGE_KEY_ACTIVITIES
    );
    const activities: Array<Activity> = data ? JSON.parse(data) : [];
    commit("activities", activities);
  },
  createActivity(
    { state, getters, commit },
    payload: ActivityCreateDto
  ): Promise<Activity> {
    return new Promise((resolve, reject) => {
      const activity: Activity = {
        _id:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        ...payload,
        createdAt: new Date(),
      };

      commit("addActivity", activity);

      // Persist to LocalStorage
      const activities = getters["getActivities"]();
      localStorage.setItem(
        LOCALSTORAGE_KEY_ACTIVITIES,
        JSON.stringify(activities)
      );

      resolve(activity);
    });
  },
  deleteActivities({ commit }): any {
    // Delete from Localstorage
    commit("activities", []);
    localStorage.removeItem(LOCALSTORAGE_KEY_ACTIVITIES);
  },
  deleteHabitActivities({ getters, commit }, habitId: string): any {
    let activities = getters["getActivities"]();
    activities = activities.filter((activity: Activity) => {
      return activity.habitId !== habitId;
    });
    commit("activities", activities);
    localStorage.setItem(
      LOCALSTORAGE_KEY_ACTIVITIES,
      JSON.stringify(activities)
    );
  },
  updateActivity(
    { state, getters, commit },
    payload: { id: string; data: ActivityUpdateDto }
  ): any {
    let activities = getters["getActivities"]();
    activities = activities.map((element: Activity) => {
      if (element._id === payload.id) {
        element = {
          ...element,
          ...payload.data,
        };
      }
      return element;
    });

    // Save to State
    commit("activities", activities);

    // Persist to localStorage
    localStorage.setItem(
      LOCALSTORAGE_KEY_ACTIVITIES,
      JSON.stringify(activities)
    );
  },
  deleteHabitActivity(
    { getters, commit },
    payload: { id: string }
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let activities = getters["getActivities"]();
      activities = activities.filter((element: Activity) => {
        return element._id !== payload.id;
      });

      // Save to State
      commit("activities", activities);

      // Persist to localStorage
      localStorage.setItem(
        LOCALSTORAGE_KEY_ACTIVITIES,
        JSON.stringify(activities)
      );

      resolve();
    });
  },
};
