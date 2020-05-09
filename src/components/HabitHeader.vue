<template>
  <div class="habitHeader">
    <router-link :to="{name: 'habit', params: {id: habit._id}}">
      <h1>
        <span>{{ habit.name }}</span>
        <HabitStreak :activities="activities" />
      </h1>
    </router-link>
    <button class="btn-dark delete" @click="deleteHabit()">Delete</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Habit } from "../store/habit/types";
import { Activity } from "../store/activity/types";
import HabitStreak from "@/components/HabitStreak.vue";

@Component({
  components: {
    HabitStreak
  }
})
export default class HabitHeader extends Vue {
  @Prop() private habit!: Habit;
  @Prop() private activities!: Array<Activity> | undefined;

  deleteHabit() {
    this.$emit("delete", this.habit);
  }
}
</script>

<style scoped lang="scss"></style>
