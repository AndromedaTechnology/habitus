<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <UserHeader v-if="user" :user="user" :allowEdit="true" @delete="userDeleteSubmit()" />
        <UserCreate v-else @submit="userCreateSubmit($event)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { User } from "@/store/user/types";

import UserHeader from "@/components/UserHeader.vue";
import UserCreate from "@/components/UserCreate.vue";

import Vue from "vue";
import { Action, Getter } from "vuex-class";
import Component from "vue-class-component";

@Component({
  name: "Home",
  components: {
    UserHeader,
    UserCreate
  }
})
export default class Home extends Vue {
  // User
  @Getter("user", { namespace: "user" }) user: User | undefined;
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;
  @Action("persistUser", { namespace: "user" }) persistUser: any;
  @Action("deleteUser", { namespace: "user" }) deleteUser: any;

  // Habits
  @Action("deleteHabits", { namespace: "habit" }) deleteHabits: any;

  // Activities
  @Action("deleteActivities", { namespace: "activity" }) deleteActivities: any;

  mounted() {
    this.fetchUser();
  }

  userCreateSubmit(username: string) {
    this.persistUser({
      username: username
    });
    this.fetchUser();
  }

  userDeleteSubmit() {
    this.deleteUser();
    this.fetchUser();

    this.deleteHabits();
    this.deleteActivities();
  }
}
</script>

<style lang="scss" scoped>
</style>
