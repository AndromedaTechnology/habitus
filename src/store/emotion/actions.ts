import { ActionTree } from "vuex";
import { RootState } from "../types";
import { EmotionHelpers } from "./helpers";
import { EmotionState, Emotion } from "./types";

export const actions: ActionTree<EmotionState, RootState> = {
  async fetchEmotions({
    getters,
    commit,
  }): Promise<Array<Emotion> | undefined> {
    // Cached
    const itemsCached = EmotionHelpers.getFromCache();
    if (itemsCached) {
      commit("setEmotions", itemsCached);
    }
    // Api
    commit("isLoading", true);
    const itemsApi = await EmotionHelpers.getFromApi();
    if (itemsApi) {
      commit("setEmotions", itemsApi);
    }
    commit("isLoading", false);
    // Set
    EmotionHelpers.cacheStore(getters);
    return Promise.resolve(itemsApi ?? itemsCached ?? []);
  },
};
