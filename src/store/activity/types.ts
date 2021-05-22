export interface Activity {
  _id: string;
  habitId?: string;
  userId?: string;
  noteId?: string;
  amount?: number;
  createdAt: Date;
}

export type ActivityUpdateDto = Omit<Activity, "_id" | "createdAt">;

export interface ActivityState {
  activities: Activities;
}

export interface Activities {
  [habitId: string]: Array<Activity>;
}
