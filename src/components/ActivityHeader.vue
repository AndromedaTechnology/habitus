<template>
  <div class="activityHeader">
    <h2 class="ago">{{ ago }} days ago</h2>
    <h3 class="amount">
      <span>{{ activity.amount }}</span>
    </h3>
    <button class="delete" @click="deleteActivity()">Delete</button>
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
.activityHeader {
  background: #1f1f1f;
  padding: 16px 32px;
  margin: 8px;
  border-radius: 16px;
}
.amount {
  display: flex;
}

.ago {
  margin-top: 8px;
}
</style>
