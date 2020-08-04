export enum HabitAmountType {
  amount = "amount",
  timer = "timer",
  check = "check",
}

export interface Habit {
  _id: string;
  isGood: boolean;
  amountType: HabitAmountType;
  userId: string;
  name: string;
  impact: number;
  startsAtDate: Date | null;
  endsAtDate: Date | null;
  repeatInSeconds: number;
}

export interface HabitState {
  habits: Array<Habit>;
}
