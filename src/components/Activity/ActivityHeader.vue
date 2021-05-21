<template>
  <v-alert class="activityHeader" dark :icon="habit.isGood ? 'add' : 'remove'">
    <!-- Habit  -->
    <router-link
      v-if="showHabit"
      :to="{name: 'habit', params: {id: habit._id}}"
      :class="{'habit': true}"
    >
      <h2 class="mb-4">
        <span>{{ habit.name }}</span>
      </h2>
    </router-link>
    <!-- Note -->
    <pre class="note" v-if="activity.note">{{ activity.note }}</pre>
    <!-- Amount -->
    <h4 class="my-4">
      <span>{{ activity.amount }} amount</span>
    </h4>
    <!-- Edit Button -->
    <div class="mt-4">
      <v-btn @click="editDialog = true">Edit</v-btn>
    </div>
    <!-- Ago -->
    <timeago class="d-block mt-4" :datetime="activity.createdAt" :auto-update="60"></timeago>
    <!-- Edit Dialog -->
    <ActivityEditDialog
      v-if="editDialog"
      :habit="habit"
      :activity="activity"
      @closed="editDialog = false"
    />
  </v-alert>
</template>
<script lang="ts">
import { Habit } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";
import { Component, Prop, Vue } from "vue-property-decorator";
import ActivityEditDialog from "@/components/Activity/ActivityEditDialog.vue";
@Component({
  components: {
    ActivityEditDialog,
  },
})
export default class ActivityHeader extends Vue {
  @Prop() private habit!: Habit;
  @Prop() private activity!: Activity;
  @Prop({ default: false, type: Boolean }) showHabit?: boolean;
  editDialog = false;
}
</script>
<style scoped lang="scss">
.note {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
</style>
<style lang="scss" scoped>
a.habit {
  color: inherit;
}
</style>
