<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <div v-if="user">
          <UserHeader
            :user="user"
            :habits="habits"
            :activities="activities"
            @delete="userDeleteSubmit()"
          />

          <HabitList :habits="habits" :user="user" />
        </div>

        <UserCreate v-else @submit="userCreateSubmit($event)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Habit } from "@/store/habit/types";
import { User } from "@/store/user/types";
import { Activities } from "@/store/activity/types";

import UserCreate from "@/components/UserCreate.vue";
import UserHeader from "@/components/UserHeader.vue";
import HabitList from "@/components/HabitList.vue";

import Vue from "vue";
import { Action, Getter } from "vuex-class";
import Component from "vue-class-component";

@Component({
  name: "Home",
  components: {
    UserCreate,
    UserHeader,
    HabitList
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

  // Activity Store
  @Getter("activities", { namespace: "activity" }) activities:
    | Activities
    | undefined;
  @Action("deleteActivities", { namespace: "activity" }) deleteActivities: any;

  mounted() {
    this.fetchUser();
    this.fetchHabits();
  }

  userCreateSubmit(username: string) {
    this.persistUser({
      username: username
    });
    this.fetchUser();
  }

  userDeleteSubmit() {
    this.deleteUser();
    this.deleteHabits();
    this.fetchHabits();
    this.fetchUser();
    this.deleteActivities();
  }
}
</script>

<style lang="scss" scoped>
.habit {
  margin: 16px;
}
</style>
