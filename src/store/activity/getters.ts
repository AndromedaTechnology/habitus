import { GetterTree } from "vuex";
import { ActivityState, Activity, Activities } from "./types";
import { RootState } from "../types";
import { Habit } from "@/store/habit/types";

export const getters: GetterTree<ActivityState, RootState> = {
  getExperienceAmount: (state, getters, rootState, rootGetters) => (
    dateStart: Date | null = null,
    dateEnd: Date | null = null
  ): number => {
    let total = 0;
    const activities: Activities | Array<Activity> | undefined =
      state.activities;

    for (const habitId in activities) {
      // Get Habit

      const habit = rootGetters["habit/getHabit"](habitId);
      if (!habit) continue;

      // Get Habit Activities
      let habitActivities = activities[habitId] ? activities[habitId] : [];

      // Filter Habit Activities by date
      habitActivities = habitActivities.filter((element) => {
        const createdAt = new Date(element.createdAt);
        if (dateStart && createdAt < dateStart) return false;
        if (dateEnd && createdAt > dateEnd) return false;
        return true;
      });

      if (habit.isGood) {
        total += habitActivities.length;
      } else {
        total -= habitActivities.length;
      }
    }

    return total;
  },

  getActivities: (state) => (
    habitId: string | null = null,
    descending = false,
    dateStart: Date | null = null,
    dateEnd: Date | null = null
  ): Activities | Array<Activity> | undefined => {
    let activities: Activities | Array<Activity> | undefined = state.activities;

    if (!habitId) {
      return activities;
    }

    activities = activities[habitId] ? activities[habitId] : [];

    // Filter by date

    activities = activities.filter((element) => {
      const createdAt = new Date(element.createdAt);

      if (dateStart && createdAt < dateStart) return false;
      if (dateEnd && createdAt > dateEnd) return false;

      return true;
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

    return activities;
  },
};
