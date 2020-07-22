import { GetterTree } from "vuex";
import { ActivityState, Activity, Activities } from "./types";
import { RootState } from "../types";
import { Habit } from "@/store/habit/types";

export const getters: GetterTree<ActivityState, RootState> = {
  getHabitExperienceAmount: (state, getters, rootState, rootGetters) => (
    habit: Habit,
    dateStart: Date | null = null,
    dateEnd: Date | null = null
  ): number => {
    let total = 0;

    // Get Activities

    const allActivities: Activities | Array<Activity> | undefined =
      state.activities;
    let activities = allActivities[habit._id] ? allActivities[habit._id] : [];

    // Filter Activities by Date

    activities = activities.filter((element) => {
      const createdAt = new Date(element.createdAt);
      if (dateStart && createdAt < dateStart) return false;
      if (dateEnd && createdAt > dateEnd) return false;
      return true;
    });

    // Is Habit Good or Bad?

    if (habit.isGood) {
      total += activities.length;
    } else {
      total -= activities.length;
    }

    return total;
  },
  getExperienceAmount: (state, getters, rootState, rootGetters) => (
    habitId: string | null = null,
    dateStart: Date | null = null,
    dateEnd: Date | null = null
  ): number => {
    let total = 0;

    // Habit

    if (habitId) {
      const habit = rootGetters["habit/getHabit"](habitId);
      if (!habit) return total;
      return getters["getHabitExperienceAmount"](habit);
    }

    // Habits

    const activities: Activities | Array<Activity> | undefined =
      state.activities;
    for (const habitId in activities) {
      const habit = rootGetters["habit/getHabit"](habitId);
      if (!habit) continue;
      total += getters["getHabitExperienceAmount"](habit);
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
