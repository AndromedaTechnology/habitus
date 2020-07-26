<template>
  <v-alert class="activityHeader" dark :icon=" habit.isGood ? 'add' : 'remove'">
    <!-- Amount -->
    <h3 class="mb-4">
      <span>{{ activity.amount }} points</span>
    </h3>

    <!-- Note -->
    <pre v-if="activity.note">{{ activity.note }}</pre>

    <!-- Edit -->

    <div class="mt-4">
      <v-btn @click="editDialog = true">Edit</v-btn>
    </div>

    <!-- Ago -->
    <timeago class="d-block mt-4" :datetime="activity.createdAt" :auto-update="60"></timeago>

    <v-dialog
      v-model="editDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <ActivityEdit
        :habit="habit"
        :activity="activity"
        @deleted="editDialog = false"
        @closed="editDialog = false"
      />
    </v-dialog>
  </v-alert>
</template>

<script lang="ts">
import ActivityEdit from "@/components/Activity/ActivityEdit.vue";

import { Habit } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    ActivityEdit,
  },
})
export default class ActivityHeader extends Vue {
  @Prop() private habit!: Habit;
  @Prop() private activity!: Activity;

  editDialog = false;
}
</script>

<style scoped lang="scss"></style>
