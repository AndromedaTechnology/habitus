export interface Habit {
  _id: string;
  name: string;
  user_id?: string;
  startsAt: Date;
  repeatInSeconds: number;
}

export interface HabitState {
  habits?: Array<Habit>;
}
