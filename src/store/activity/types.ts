export interface Activity {
  _id?: string;
  habitId: string;
  userId: string;
  amount: number;
  count?: number; // for heatmap
  createdAt: Date;
  date?: Date; // For heatmap
}

export interface ActivityState {
  activities: Activities;
}

export interface Activities {
  [habitId: string]: Array<Activity>;
}
