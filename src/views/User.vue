<template>
  <div>
    <UserHeader
      :user="currentUser"
      :allowEdit="true"
      @delete="userDeleteSubmit()"
    />
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="8" offset-sm="2">
          <Stats :habits="habits" :activities="getActivities()" />
          <ActivityList
            class="mt-12"
            :activities="getActivities(undefined, true, activityListDateStart, activityListDateEnd)"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { User as UserType } from "@/store/user/types";
import { Habit } from "@/store/habit/types";
import { Action, Getter } from "vuex-class";
import Component from "vue-class-component";
import Stats from "@/components/User/Stats.vue";
import { Activity } from "@/store/activity/types";
import UserHeader from "@/components/User/UserHeader.vue";
import ActivityList from "@/components/Activity/ActivityList.vue";
@Component({
  name: "User",
  components: {
    Stats,
    UserHeader,
    ActivityList,
  },
})
export default class User extends Vue {
  // User
  @Getter("currentUser", { namespace: "user" }) currentUser: UserType | undefined;
  @Action("deleteUser", { namespace: "user" }) deleteUser!: (id: string) => any;
  @Action("setCurrentUserId", { namespace: "user" }) setCurrentUserId!: (id: string | undefined) => any;

  // Habits
  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;
  @Action("deleteHabits", { namespace: "habit" }) deleteHabits: any;

  // Activities
  @Getter("getActivities", { namespace: "activity" })
  getActivities: Array<Activity> | undefined;
  @Action("deleteActivities", { namespace: "activity" }) deleteActivities: any;

  activityListDateStart: Date | null = null;
  activityListDateEnd: Date | null = null;

  mounted() {
    this.setActivityListDates();
  }

  setActivityListDates(start: Date | null = null, end: Date | null = null) {
    this.activityListDateStart = new Date();
    this.activityListDateStart.setHours(0, 0, 0, 0);

    this.activityListDateEnd = new Date();
    this.activityListDateEnd.setHours(23, 59, 59, 999);
  }

  userDeleteSubmit() {
    this.deleteUser(this.currentUser!._id);
    this.setCurrentUserId(undefined);

    this.deleteHabits();
    this.fetchHabits();
    this.deleteActivities();
  }
}
</script>
