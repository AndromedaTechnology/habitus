<template>
  <v-alert class="activityHeader" dark :icon=" habit.isGood ? 'add' : 'remove'">
    <h3 class="mb-4">
      <span>{{ activity.amount }} amount</span>
    </h3>
    <p v-if="activity.note">{{ activity.note }}</p>
    <v-btn @click="deleteActivity()">Delete</v-btn>
    <timeago :datetime="activity.createdAt" :auto-update="60" class="d-block mt-4"></timeago>
  </v-alert>
</template>

<script lang="ts">
import { Habit } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ActivityHeader extends Vue {
  @Prop() private habit!: Habit;
  @Prop() private activity!: Activity;

  deleteActivity() {
    this.$emit("delete", this.activity);
  }
}
</script>

<style scoped lang="scss"></style>
