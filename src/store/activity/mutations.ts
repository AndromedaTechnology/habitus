import { MutationTree } from "vuex";
import { ActivityState, Activity } from "./types";

export const mutations: MutationTree<ActivityState> = {
  activities(state, activities: Array<Activity>) {
    state.activities = activities;
  },
  addActivity(state, payload: Activity) {
    let data = state.activities;
    if (!data) {
      data = [];
    }
    data.push(payload);
    state.activities = data;
  },
};
