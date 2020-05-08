<template>
  <div>
    <div v-if="user">
      <!-- User Header -->
      <UserHeader :user="user" @delete="userDeleteSubmit()" />

      <!-- Habit List -->
      <div v-for="habit in habits" :key="habit.name" class="habits">
        <!-- Habit List Single -->
        <HabitHeader :habit="habit" @delete="habitDeleteSubmit($event)" />

        <!-- Habit Activity Create -->
        <ActivityCreate
          @submit="activityCreateSubmit(habit._id, user._id, $event)"
        />

        <!-- Habit Heatmap -->
        <calendar-heatmap
          :values="heatmapHabitActivities(habit._id)"
          :end-date="new Date()"
        />

        <!-- Activity List -->
        <div class="div" v-if="false">
          <div
            v-for="activity in habitActivities(habit._id)"
            :key="activity._id"
            class="activities"
          >
            <!-- Activity List Single -->
            <ActivityHeader
              :activity="activity"
              @delete="activityDeleteSubmit($event)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- User Create -->
    <UserCreate v-else @submit="userCreateSubmit($event)" />
  </div>
</template>

<script lang="ts">
import { CalendarHeatmap } from "vue-calendar-heatmap";

import { State, Action, Getter } from "vuex-class";

import { UserState, User } from "@/store/user/types";
import UserCreate from "@/components/UserCreate.vue";
import UserHeader from "@/components/UserHeader.vue";

import { HabitState, Habit } from "@/store/habit/types";
import HabitHeader from "@/components/HabitHeader.vue";

import { ActivityState, Activity } from "@/store/activity/types";
import ActivityCreate from "@/components/ActivityCreate.vue";
import ActivityHeader from "@/components/ActivityHeader.vue";

import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "Home",
  components: {
    CalendarHeatmap,
    HabitHeader,
    UserCreate,
    UserHeader,
    ActivityCreate,
    ActivityHeader,
  },
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
  @Getter("habitActivities", { namespace: "activity" }) habitActivities:
    | Array<Activity>
    | undefined;
  @Getter("heatmapHabitActivities", { namespace: "activity" })
  heatmapHabitActivities: Array<Activity> | undefined;
  @Action("fetchActivities", { namespace: "activity" }) fetchActivities: any;
  @Action("persistActivity", { namespace: "activity" }) persistActivity: any;
  @Action("deleteActivities", { namespace: "activity" }) deleteActivities: any;
  @Action("deleteHabitActivities", { namespace: "activity" })
  deleteHabitActivities: any;
  @Action("deleteHabitActivity", { namespace: "activity" })
  deleteHabitActivity: any;

  mounted() {
    this.fetchUser();
    this.fetchHabits();
    this.fetchActivities();
  }

  userCreateSubmit(username: string) {
    this.persistUser({
      username: username,
    });
    this.fetchUser();
  }

  activityCreateSubmit(habitId: string, userId: string, amount: number) {
    this.persistActivity({
      habitId: habitId,
      userId: userId,
      amount: amount,
    });
    this.fetchActivities();
  }

  activityDeleteSubmit(activity: Activity) {
    console.log(activity);
    this.deleteHabitActivity(activity);
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
