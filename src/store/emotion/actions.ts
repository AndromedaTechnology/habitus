import { ActionTree } from "vuex";
import { RootState } from "../types";
import { EmotionHelpers } from './helpers';
import { EmotionState, Emotion } from "./types";

export const actions: ActionTree<EmotionState, RootState> = {
  async fetchEmotions({ getters, commit }): Promise<Array<Emotion> | undefined> {
    const items = await EmotionHelpers.fetchEmotions();
    commit("setEmotions", items);
    EmotionHelpers.cacheStore(getters);
    return Promise.resolve(items);
  },
};
