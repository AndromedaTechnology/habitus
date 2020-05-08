<template>
  <div class="habitCreate">
    <h1>Create a Habit</h1>
    <input type="text" placeholder="Name" v-model="name" @keyup.enter="submit()" />
    <button @click="submit()">Create</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HabitCreate extends Vue {
  name: string | null = null;

  submit() {
    this.$emit("submit", this.name);
  }
}
</script>

<style scoped lang="scss">
</style>
