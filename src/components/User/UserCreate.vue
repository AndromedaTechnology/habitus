<template>
  <div class="userCreate">
    <h1 class="mb-12">Choose your username</h1>
    <v-text-field
      solo
      x-large
      v-model="username"
      placeholder="Username"
      @keyup.enter="submit()"
    ></v-text-field>
    <v-btn @click="submit()" block x-large>
      <v-icon class="mr-4">save</v-icon>
      <h3>Go!</h3>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { User } from "@/store/user/types";

import { Component, Prop, Vue } from "vue-property-decorator";

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
