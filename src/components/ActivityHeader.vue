<template>
  <v-alert class="activityHeader" dark icon="mdi-flare">
    <h3 class="mb-4">
      <span
        >{{ activity.amount }}
        {{ activity.amount !== 1 ? "points" : "point" }}</span
      >
    </h3>
    <v-btn @click="deleteActivity()">Delete</v-btn>
    <timeago
      :datetime="activity.createdAt"
      :auto-update="60"
      class="d-block mt-4"
    ></timeago>
  </v-alert>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Activity } from "../store/activity/types";

@Component
export default class ActivityHeader extends Vue {
  @Prop() private activity!: Activity;

  deleteActivity() {
    this.$emit("delete", this.activity);
  }
}
</script>

<style scoped lang="scss"></style>
