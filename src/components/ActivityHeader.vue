<template>
  <v-alert class="activityHeader" dark icon="mdi-flare">
    <h3 class="mb-4">
      <span
        >{{ activity.amount }}
        {{ activity.amount !== 1 ? "points" : "point" }}</span
      >
    </h3>
    <v-btn @click="deleteActivity()">Delete</v-btn>
    <h5 class="ago mt-4">{{ ago }} days ago</h5>
  </v-alert>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Activity } from "../store/activity/types";

@Component
export default class ActivityHeader extends Vue {
  @Prop() private activity!: Activity;

  get ago() {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffSeconds =
      new Date().getTime() - new Date(this.activity.createdAt).getTime();

    if (!diffSeconds) return 0;

    const diffDays = Math.round(diffSeconds / oneDay);
    return diffDays;
  }

  deleteActivity() {
    this.$emit("delete", this.activity);
  }
}
</script>

<style scoped lang="scss"></style>
