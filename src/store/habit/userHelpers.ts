import { Habit, LOCALSTORAGE_KEY_HABITS } from './types';

export class UserHabitHelpers {
  /**
   * Fetch Habits created by the user.
   * From LocalStorage.
   *
   * @returns {Array<Habit>}
   */
  static fetchUserHabits(): Array<Habit> {
    const ls:
      | string
      | null
      | undefined = localStorage.getItem(LOCALSTORAGE_KEY_HABITS);
    const items: Array<Habit> = ls
      ? JSON.parse(ls)
      : [];
    return items;
  }

  static persistUserHabits(items: Array<Habit>) {
    localStorage.setItem(LOCALSTORAGE_KEY_HABITS, JSON.stringify(items));
  }
}
