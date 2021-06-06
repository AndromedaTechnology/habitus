import { Habit } from './types';
import { UserHabitHelpers } from "./userHelpers";
import { GlobalHabitHelpers } from "./globalHelpers";

export class HabitHelpers {
  /**
   * Combined Global and User-created Habits.
   *
   * @returns {Promise<Array<Habit>>}
   */
  static async fetchHabits(): Promise<Array<Habit>> {
    return [
      ...UserHabitHelpers.fetchUserHabits(),
      ...await GlobalHabitHelpers.fetchGlobalHabits() ?? [],
    ];
  }

  /**
   * Sort Habits by isGood
   *
   * @param {Array<Habit> | undefined} habits
   * @param {boolean}                  isDescending
   *
   * @returns {Array<Habit> | undefined}
   */
  static sortHabitsByIsGood(
    habits: Array<Habit> | undefined,
    isDescending = true
  ): Array<Habit> | undefined {
    return habits?.sort((a, b) => {
      const cmpDescending = (a.isGood ?? 1) > (b.isGood ?? 1);
      if (isDescending) return cmpDescending ? -1 : 1;
      return cmpDescending ? 1 : -1;
    });
  }
}
