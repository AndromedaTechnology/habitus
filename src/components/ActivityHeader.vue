<template>
  <div class="activityHeader">
    <h1 class="amount">
      <span>{{ activity.amount }}</span>
      <button class="delete" @click="deleteActivity()">Delete</button>
    </h1>
    <span>{{ ago }} days ago</span>
  </div>
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

<style scoped lang="scss">
.amount {
  display: flex;
}

button.delete {
  margin-left: 8px;
}
</style>
