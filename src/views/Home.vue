<template>
  <div>
    <UserHeader
      v-if="user"
      :user="user"
      :allowEdit="true"
      @delete="userDeleteSubmit()"
    />
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="8" offset-sm="2">
          <div v-if="user">
            <Stats :habits="habits" :activities="getActivities()" />
            <ActivityList
              class="mt-12"
              :activities="getActivities(undefined, true, activityListDateStart, activityListDateEnd)"
            />
          </div>
          <div v-else class="mt-12">
            <Welcome
              v-if="!isWelcomeDone"
              @done="isWelcomeDone = true"
            />
            <v-slide-y-transition>
              <UserCreate
                v-show="isWelcomeDone"
                @submit="userCreateSubmit($event)"
              />
            </v-slide-y-transition>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { User } from "@/store/user/types";
import { Habit } from "@/store/habit/types";
import { Action, Getter } from "vuex-class";
import Component from "vue-class-component";
import Stats from "@/components/User/Stats.vue";
import { Activity } from "@/store/activity/types";
import Welcome from '@/components/General/Welcome.vue';
import UserCreate from "@/components/User/UserCreate.vue";
import UserHeader from "@/components/User/UserHeader.vue";
import ActivityList from "@/components/Activity/ActivityList.vue";
@Component({
  name: "Home",
  components: {
    UserHeader,
    UserCreate,
    Stats,
    Welcome,
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

  isWelcomeDone = false;

  activityListDateStart: Date | null = null;
  activityListDateEnd: Date | null = null;

  mounted() {
    this.fetchUser();
    this.fetchActivities();
    this.setActivityListDates();
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
