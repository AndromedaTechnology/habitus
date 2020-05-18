export enum HabitAmountType {
  amount = "amount",
  timer = "timer",
  check = "check",
}

export interface Habit {
  _id: string;
  amountType: HabitAmountType;
  userId: string;
  name: string;
  startsAtDate: Date | null;
  endsAtDate: Date | null;
  repeatInSeconds: number;
}

export interface HabitState {
  habits: Array<Habit>;
}
