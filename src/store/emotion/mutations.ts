import { MutationTree } from "vuex";
import { EmotionState, Emotion } from "./types";

export const mutations: MutationTree<EmotionState> = {
  updateEmotion(state, payload: { emotion: Emotion; data: any }) {
    const emotions = state.emotions?.map((element: Emotion) => {
      if (element._id === payload.emotion._id) {
        element = {
          ...element,
          ...payload.data,
        };
      }
      return element;
    });

    state.emotions = emotions;
  },
  setEmotions(state, payload: Array<Emotion>) {
    state.emotions = payload;
  },
};
