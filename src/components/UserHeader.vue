<template>
  <div v-if="user" class="userHeader">
    <h1>{{ user.username }}</h1>
    <button @click="deleteUser()">Delete</button>
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
