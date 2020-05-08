<template>
  <div class="userCreate">
    <h1>Choose your username</h1>
    <input type="text" v-model="username" @keyup.enter="submit()" />
    <button class="btn-dark" @click="submit()">Go!</button>
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
