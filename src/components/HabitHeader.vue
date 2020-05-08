<template>
  <div class="habitHeader">
    <h1>
      <span>{{ habit.name }}</span>
    </h1>
    <button @click="deleteHabit()">Delete Habit</button>
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

<style scoped lang="scss">
</style>
