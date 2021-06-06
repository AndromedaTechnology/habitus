import apiClient from "@/apiClient";
import { Habit, LOCALSTORAGE_KEY_HABITS_GLOBAL } from './types';

export class GlobalHabitHelpers {
  /**
   * Get Habits Global.
   * Fetch From API or return cached.
   *
   * @returns {Promise<Array<Habit> | undefined>}
   */
  static async fetchGlobalHabits(): Promise<Array<Habit> | undefined> {
    const items = await this.fetchGlobalHabitsFromApi();
    if (items) {
      this.cacheGlobalHabits(items);
      return items;
    }
    return this.getCachedGlobalHabits();
  }

  /**
   * Fetch Habits Global.
   * From API.
   *
   * @returns {Promise<Array<Habit> | undefined>}
   */
  private static async fetchGlobalHabitsFromApi(): Promise<Array<Habit> | undefined> {
    try {
      const response = await apiClient.get("/habits");
      return response ? response.data : undefined;
    } catch (e) {
      return undefined;
    }
  }

  /**
   * From LocalStorage.
   *
   * @returns {Array<Habit>}
   */
  private static getCachedGlobalHabits(): Array<Habit> {
    const ls:
      | string
      | null
      | undefined = localStorage.getItem(LOCALSTORAGE_KEY_HABITS_GLOBAL);
    const items: Array<Habit> = ls
      ? JSON.parse(ls)
      : [];
    return items;
  }

  static cacheGlobalHabits(items: Array<Habit>) {
    localStorage.setItem(LOCALSTORAGE_KEY_HABITS_GLOBAL, JSON.stringify(items));
  }
}
