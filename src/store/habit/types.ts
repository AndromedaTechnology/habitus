export interface Habit {
  _id: string;
  name: string;
  user_id?: string;
  startsAtDate: Date;
  repeatInSeconds: number;
}

export interface HabitState {
  habits?: Array<Habit>;
}
