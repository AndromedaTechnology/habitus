<template>
  <v-container>
    <v-row v-if="user">
      <v-col cols="12" sm="12">
        <UserHeader :user="user" :allowEdit="true" @delete="userDeleteSubmit()" />
        <Stats :habits="habits" :activities="getActivities()" />
        <ActivityList
          :activities="getActivities(undefined, true, activityListDateStart, activityListDateEnd)"
        />
        <!-- <HabitList :habits="habits" :user="user" class="mt-12" /> -->
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" sm="12">
        <UserCreate @submit="userCreateSubmit($event)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import UserHeader from "@/components/User/UserHeader.vue";
import UserCreate from "@/components/User/UserCreate.vue";
import Stats from "@/components/User/Stats.vue";
import HabitList from "@/components/Habit/HabitList.vue";
import ActivityList from "@/components/Activity/ActivityList.vue";

import { User } from "@/store/user/types";
import { Habit } from "@/store/habit/types";
import { Activities, Activity } from "@/store/activity/types";

import Vue from "vue";
import { Action, Getter } from "vuex-class";
import Component from "vue-class-component";

@Component({
  name: "Home",
  components: {
    UserHeader,
    UserCreate,
    Stats,
    HabitList,
    ActivityList,
  },
})
export default class Home extends Vue {
  // User
  @Getter("user", { namespace: "user" }) user: User | undefined;
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;
  @Action("persistUser", { namespace: "user" }) persistUser: any;
  @Action("deleteUser", { namespace: "user" }) deleteUser: any;

  // Habits
  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;
  @Action("deleteHabits", { namespace: "habit" }) deleteHabits: any;

  // Activities
  @Getter("getActivities", { namespace: "activity" })
  getActivities: Array<Activity> | undefined;
  @Action("fetchActivities", { namespace: "activity" }) fetchActivities: any;
  @Action("deleteActivities", { namespace: "activity" }) deleteActivities: any;

  activityListDateStart: Date | null = null;
  activityListDateEnd: Date | null = null;

  mounted() {
    this.fetchUser();
    this.fetchActivities();
  }

  setActivityListDates(start: Date | null = null, end: Date | null = null) {
    this.activityListDateStart = new Date();
    this.activityListDateStart.setHours(0, 0, 0, 0);

    this.activityListDateEnd = new Date();
    this.activityListDateEnd.setHours(23, 59, 59, 999);
  }

  userCreateSubmit(username: string) {
    this.persistUser({
      username: username,
    });
    this.fetchUser();
  }

  userDeleteSubmit() {
    this.deleteUser();
    this.fetchUser();

    this.deleteHabits();
    this.fetchHabits();
    this.deleteActivities();
  }
}
</script>

<style lang="scss" scoped>
</style>
