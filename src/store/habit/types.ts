export interface Habit {
  _id: string;
  name: string;
  user_id?: string;
}

export interface HabitState {
  habits?: Array<Habit>;
}
