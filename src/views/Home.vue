<template>
  <div class="home" v-if="userState.user">
    <UserHeader :user="userState.user" />
  </div>
</template>

<script lang="ts">
const namespace = "user";
import { State, Action, Getter } from "vuex-class";
import { UserState, User } from "@/store/user/types";

import UserHeader from "@/components/UserHeader.vue";

import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "Home",
  components: {
    UserHeader
  },
  computed: {}
})
export default class Home extends Vue {
  @State("user") userState: UserState;
  @Action("fetchUser", { namespace }) fetchUser: any;

  mounted() {
    this.fetchUser();
  }
}
</script>
