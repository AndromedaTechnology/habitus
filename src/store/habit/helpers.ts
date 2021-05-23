import { Habit } from "./types";

export class HabitHelpers {
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
