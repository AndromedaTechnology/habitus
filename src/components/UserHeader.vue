<template>
  <div class="userHeader">
    <h1>
      <span>@</span>
      <span>{{ user.username }}</span>
    </h1>
    <button @click="deleteUser()">Delete User</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "../store/user/types";

@Component
export default class UserHeader extends Vue {
  @Prop() private user!: User;

  deleteUser() {
    this.$emit("delete");
  }
}
</script>

<style scoped lang="scss">
</style>
