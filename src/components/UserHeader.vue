<template>
  <div class="userHeader">
    <button class="btn-dark" @click="deleteUser()">Delete</button>
    <h1>
      <span>@</span>
      <span>{{ user.username }}</span>
    </h1>
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
.userHeader {
  text-align: center;
}
</style>
