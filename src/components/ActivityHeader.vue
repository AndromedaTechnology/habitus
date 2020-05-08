<template>
  <div class="activityHeader">
    <h1>
      <span>{{ activity.amount }}</span>
    </h1>
    <button @click="deletActivity()">Delete Activity</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Activity } from "../store/activity/types";

@Component
export default class ActivityHeader extends Vue {
  @Prop() private activity!: Activity;

  deletActivity() {
    this.$emit("delete", this.activity);
  }
}
</script>

<style scoped lang="scss">
</style>
