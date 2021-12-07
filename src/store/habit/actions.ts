import { ActionTree } from "vuex";
import { RootState } from "../types";
import { HabitHelpers } from "./helpers";
import { HabitState, Habit } from "./types";
import { UserHabitHelpers } from "./userHelpers";

export const actions: ActionTree<HabitState, RootState> = {
  async fetchHabits({ commit }): Promise<Array<Habit>> {
    commit("isLoading", true);
    const items = await HabitHelpers.fetchHabits();
    commit("isLoading", false);
    commit("setHabits", items);
    return Promise.resolve(items);
  },
  updateHabit(
    { state, getters, commit },
    payload: { habit: Habit; data: any }
  ): any {
    commit("updateHabit", {
      habitId: payload.habit._id,
      data: payload.data,
    });
    UserHabitHelpers.persistUserHabits(getters["userHabits"]);
  },
  persistHabit({ state, getters, commit }, habit: Habit): Promise<Habit> {
    return new Promise((resolve, reject) => {
      // Generate ID, Add
      habit._id =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
      commit("addHabit", habit);
      UserHabitHelpers.persistUserHabits(getters["userHabits"]);
      resolve(habit);
    });
  },
  deleteHabit({ getters, commit }, habit: Habit): any {
    commit("removeHabit", habit._id);
    UserHabitHelpers.persistUserHabits(getters["userHabits"]);
  },
  deleteHabits({ commit }): any {
    UserHabitHelpers.persistUserHabits([]);
  },
};
