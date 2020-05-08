export interface Activity {
  _id?: string;
  habitId: string;
  userId: string;
  amount: number;
  createdAt: Date;
}

export interface ActivityState {
  activities: Activities;
}

export interface Activities {
  [habitId: string]: Array<Activity>;
}
