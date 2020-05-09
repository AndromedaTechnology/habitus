<template>
  <div>
    <div v-if="user">
      <!-- User Header -->
      <UserHeader
        :user="user"
        :habits="habits"
        :activities="activities"
        @delete="userDeleteSubmit()"
      />

      <!-- Habit List -->
      <div v-for="habit in habits" :key="habit.name" class="habit">
        <!-- Habit List Single -->
        <HabitHeader
          :habit="habit"
          :activities="heatmapHabitActivities(habit._id)"
          @delete="habitDeleteSubmit($event)"
        />

        <!-- Habit Activity Create -->
        <ActivityCreate @submit="activityCreateSubmit(habit._id, user._id, $event)" />

        <br />

        <!-- Habit Activity Chart -->
        <ActivityChart
          v-if="heatmapHabitActivities(habit._id)"
          :activities="heatmapHabitActivities(habit._id)"
        />
      </div>
    </div>

    <!-- User Create -->
    <UserCreate v-else @submit="userCreateSubmit($event)" />
  </div>
</template>

<script lang="ts">
import { State, Action, Getter } from "vuex-class";

import ActivityChart from "@/components/ActivityChart.vue";

import { UserState, User } from "@/store/user/types";
import UserCreate from "@/components/UserCreate.vue";
import UserHeader from "@/components/UserHeader.vue";

import { HabitState, Habit } from "@/store/habit/types";
import HabitHeader from "@/components/HabitHeader.vue";

import { ActivityState, Activity, Activities } from "@/store/activity/types";
import ActivityCreate from "@/components/ActivityCreate.vue";

import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "Home",
  components: {
    ActivityChart,
    HabitHeader,
    UserCreate,
    UserHeader,
    ActivityCreate
  }
})
export default class Home extends Vue {
  // User Store
  @Getter("user", { namespace: "user" }) user: User | undefined;
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;
  @Action("persistUser", { namespace: "user" }) persistUser: any;
  @Action("deleteUser", { namespace: "user" }) deleteUser: any;

  // Habit Store
  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;
  @Action("deleteHabits", { namespace: "habit" }) deleteHabits: any;
  @Action("deleteHabit", { namespace: "habit" }) deleteHabit: any;

  // Activity Store
  @Getter("activities", { namespace: "activity" }) activities:
    | Activities
    | undefined;
  @Getter("heatmapHabitActivities", { namespace: "activity" })
  heatmapHabitActivities: Array<Activity> | undefined;
  @Action("fetchActivities", { namespace: "activity" }) fetchActivities: any;
  @Action("persistActivity", { namespace: "activity" }) persistActivity: any;
  @Action("deleteActivities", { namespace: "activity" }) deleteActivities: any;
  @Action("deleteHabitActivities", { namespace: "activity" })
  deleteHabitActivities: any;

  mounted() {
    this.fetchUser();
    this.fetchHabits();
    this.fetchActivities();
  }

  userCreateSubmit(username: string) {
    this.persistUser({
      username: username
    });
    this.fetchUser();
  }

  activityCreateSubmit(habitId: string, userId: string, amount: number) {
    this.persistActivity({
      habitId: habitId,
      userId: userId,
      amount: amount
    });
    this.fetchActivities();
  }

  userDeleteSubmit() {
    this.deleteUser();
    this.deleteHabits();
    this.fetchHabits();
    this.fetchUser();
    this.deleteActivities();
  }

  habitDeleteSubmit(habit: Habit) {
    this.deleteHabit(habit);
    this.deleteHabitActivities(habit);
    this.fetchHabits();
  }
}
</script>

<style lang="scss" scoped>
.habit {
  margin: 16px;
}
@media (min-width: 768px) {
  .habit {
    margin: 64px;
  }
}
</style>
