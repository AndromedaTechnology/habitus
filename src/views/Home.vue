<template>
  <div>
    <UserHeader v-if="user" :user="user" @delete="userDeleteSubmit()" />
    <UserCreate v-else @submit="userCreateSubmit($event)" />
  </div>
</template>

<script lang="ts">
const namespace = "user";
import { State, Action, Getter } from "vuex-class";
import { UserState, User } from "@/store/user/types";

import UserCreate from "@/components/UserCreate.vue";
import UserHeader from "@/components/UserHeader.vue";

import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "Home",
  components: {
    UserCreate,
    UserHeader
  },
  computed: {}
})
export default class Home extends Vue {
  @Getter("user", { namespace }) user: User | undefined;
  @Action("fetchUser", { namespace }) fetchUser: any;
  @Action("persistUser", { namespace }) persistUser: any;
  @Action("deleteUser", { namespace }) deleteUser: any;

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
  }
}
</script>
