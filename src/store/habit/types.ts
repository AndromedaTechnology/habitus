export enum HabitType {
  amount = "amount",
  timer = "timer",
  check = "check",
}

export interface Habit {
  _id: string;
  type: HabitType;
  userId: string;
  name: string;
  startsAtDate: Date;
  repeatInSeconds: number;
}

export interface HabitState {
  habits: Array<Habit>;
}
