export interface Activity {
  _id: string;
  emotionId?: string;
  habitId?: string;
  tagIds?: Array<string>;
  userId?: string;
  noteId?: string;
  amount?: number;
  createdAt: Date;
}

export type ActivityCreateDto = ActivityUpdateDto;
export type ActivityUpdateDto = Omit<Activity, "_id" | "createdAt">;

export interface ActivityState {
  activities: Array<Activity>;
}
