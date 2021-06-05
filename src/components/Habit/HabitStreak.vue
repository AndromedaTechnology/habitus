<template>
  <v-chip
    v-if="streak"
    class="ma-2"
    :color="habit.isGood ? colors.GOOD : colors.BAD"
    text-color="white"
  >
    <h3 class="font-weight-bold">{{ streak }} day streak</h3>
  </v-chip>
</template>
<script lang="ts">
import { COLORS } from "@/helpers/enums";
import { Habit } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class HabitStreak extends Vue {
  @Prop() private habit!: Habit;
  @Prop() private activities!: Array<Activity> | undefined;

  colors: any = COLORS;

  get streak(): number {
    if (!this.activities) return 0;
    let streak = 0;
    const currentDate = new Date();
    let exists = false;
    do {
      exists = this.activities.some((activity: Activity) => {
        return this.areDatesSameDay(new Date(activity.createdAt), currentDate);
      });
      if (exists) ++streak;
      currentDate.setDate(currentDate.getDate() - 1);
    } while (exists);
    return streak;
  }

  areDatesSameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }
}
</script>
