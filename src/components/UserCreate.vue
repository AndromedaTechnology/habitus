<template>
  <div class="userCreate">
    <h1>Choose your username</h1>
    <v-text-field solo dense v-model="username" @keyup.enter="submit()"></v-text-field>
    <v-btn @click="submit()">Go!</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "../store/user/types";

@Component
export default class UserCreate extends Vue {
  username: string | null = null;

  submit() {
    this.$emit("submit", this.username);
  }
}
</script>

<style scoped lang="scss">
.userCreate {
  text-align: center;
}
</style>
