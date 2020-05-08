<template>
  <div class="habitHeader">
    <h1>{{ habit.name }}</h1>
    <button class="btn-dark delete" @click="deleteHabit()">Delete</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Habit } from "../store/habit/types";

@Component
export default class HabitHeader extends Vue {
  @Prop() private habit!: Habit;

  deleteHabit() {
    this.$emit("delete", this.habit);
  }
}
</script>

<style scoped lang="scss"></style>
