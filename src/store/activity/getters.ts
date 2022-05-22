import { GetterTree } from "vuex";
import { RootState } from "../types";
import { Habit } from "@/store/habit/types";
import { ActivityState, Activity } from "./types";

export function filterActivitiesByDate(
  activities?: Array<Activity>,
  dateStart?: Date,
  dateEnd?: Date
): Array<Activity> {
  if (!activities) return [];
  return activities.filter((element) => {
    const createdAt = new Date(element.createdAt);
    if (dateStart && createdAt < dateStart) return false;
    if (dateEnd && createdAt > dateEnd) return false;
    return true;
  });
}

export function filterActivitiesByTagIds(
  activities?: Array<Activity>,
  tagIds?: Array<string>
): Array<Activity> {
  if (!activities) return [];
  if (!tagIds) return activities;

  return activities.filter((activity) => {
    let isValid = true;
    for (const tagId of tagIds) {
      const isTagIdFound = activity.tagIds?.find((item) => item === tagId);
      if (!isTagIdFound) {
        isValid = false;
        break;
      }
    }
    return isValid;
  });
}

export function calculateActivitiesImpact(
  activities: Array<Activity>,
  itemImpact = 1
): number {
  const impact = activities.reduce((total, item) => {
    return total + itemImpact;
  }, 0);
  return impact;
}

export function filterActivitiesByHabit(
  activities: Array<Activity> | undefined,
  habitId: string
): Array<Activity> {
  if (!activities) return [];
  return activities.filter((activity: Activity) => {
    return activity.habitId === habitId;
  });
}

export function sortActivities(
  activities: Array<Activity>,
  isDescending = true
): Array<Activity> {
  activities = activities.slice().sort(function(a, b) {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    if (isDescending === true) {
      return dateA > dateB ? -1 : 1;
    } else {
      return dateA > dateB ? 1 : -1;
    }
  });
  return activities;
}

export const getters: GetterTree<ActivityState, RootState> = {
  getActivities: (state) => (
    habitId: string | undefined = undefined,
    isDescending = false,
    tagIds?: Array<string>,
    dateStart?: Date,
    dateEnd?: Date
  ): Array<Activity> | undefined => {
    let activities: Array<Activity> | undefined = state.activities;
    if (habitId) {
      activities = filterActivitiesByHabit(activities, habitId);
    }
    activities = filterActivitiesByDate(activities, dateStart, dateEnd);
    activities = filterActivitiesByTagIds(activities, tagIds);
    activities = sortActivities(activities, isDescending);
    return activities;
  },
  getHabitHealth: (state, getters, rootState, rootGetters) => (
    habit: Habit,
    dateStart?: Date,
    dateEnd?: Date
  ): number => {
    let activities = filterActivitiesByHabit(state.activities, habit._id);
    activities = filterActivitiesByDate(activities, dateStart, dateEnd);
    const impact = activities.length
      ? calculateActivitiesImpact(activities, habit.impact)
      : 0;
    return habit.isGood ? impact : -impact;
  },
  getHealth: (state, getters, rootState, rootGetters) => (
    habitId: string | null = null,
    dateStart: Date | null = null,
    dateEnd: Date | null = null
  ): number => {
    let health = 0;

    // Habit
    if (habitId) {
      const habit = rootGetters["habit/getHabit"](habitId);
      if (!habit) return health;
      return getters["getHabitHealth"](habit);
    }

    // Habits
    const activities: Array<Activity> | undefined = state.activities;
    for (const activity of activities) {
      if (!activity.habitId) continue;
      const habit = rootGetters["habit/getHabit"](activity.habitId);
      if (!habit) continue;
      const habitImpact = habit.impact ?? 1;
      health += habit.isGood ? habitImpact : -habitImpact;
    }

    return health;
  },
};
