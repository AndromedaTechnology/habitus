export const LOCALSTORAGE_KEY_HABITS = "habits";
export const LOCALSTORAGE_KEY_HABITS_GLOBAL = "habits_global";

export enum HabitAmountType {
  amount = "amount",
  timer = "timer",
  check = "check",
}

export interface Habit {
  _id: string;
  isGood?: boolean;
  amountType?: HabitAmountType;
  userId?: string;
  name?: string;
  impact?: number;
  emoji?: string;
  startsAtDate?: Date;
  endsAtDate?: Date;
  repeatInSeconds?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HabitState {
  habits: Array<Habit>;
}
