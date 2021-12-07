import { GetterTree } from "vuex";
import { EmotionState, Emotion } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<EmotionState, RootState> = {
  isLoading(state): boolean | undefined {
    const { isLoading } = state;
    return isLoading;
  },
  emotions(state): Array<Emotion> | undefined {
    const { emotions } = state;
    return emotions;
  },
  getEmotion: (state) => (emotionId: string): Emotion | null => {
    const { emotions } = state;
    if (!emotions) return null;

    const emotion = emotions.find((element: Emotion) => {
      return element._id === emotionId;
    });

    return emotion ? emotion : null;
  },
};
