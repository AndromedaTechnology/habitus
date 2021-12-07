export const LOCALSTORAGE_KEY_EMOTIONS = "emotions";

export interface Emotion {
  _id: string;
  emoji?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EmotionState {
  emotions: Array<Emotion>;
  isLoading: boolean;
}
