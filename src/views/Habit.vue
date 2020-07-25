<template>
  <v-container v-if="user && habit">
    <v-row>
      <v-col cols="12" sm="12">
        <!-- Edit -->
        <div class="text-center mt-4">
          <v-btn @click="editDialog = true" large>Edit</v-btn>
        </div>

        <!-- Header -->

        <HabitHeader
          class="mt-4 text-center"
          v-if="habit"
          :showStreak="true"
          :habit="habit"
          :activities="getActivities(habit._id)"
        />

        <!-- Edit  -->

        <v-dialog
          v-model="editDialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          scrollable
        >
          <HabitEdit
            :habit="habit"
            @update="handleUpdate($event)"
            @delete="handleDelete()"
            @close="editDialog = false"
          />
        </v-dialog>

        <!--  Activity Chart -->

        <ActivityChart
          v-if="getActivities(habit._id)"
          class="activityChart"
          :habit="habit"
          :activities="getActivities(habit._id)"
        />

        <!-- Activity List -->

        <div class="activityList">
          <ActivityHeader
            v-for="activity in getActivities(habit._id, true)"
            :key="activity._id"
            :habit="habit"
            :activity="activity"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import HabitEdit from "@/components/Habit/HabitEdit.vue";
import HabitHeader from "@/components/Habit/HabitHeader.vue";
import ActivityHeader from "@/components/Activity/ActivityHeader.vue";
import ActivityChart from "@/components/Activity/ActivityChart.vue";

import { User } from "@/store/user/types";
import { Activity, Activities } from "@/store/activity/types";

import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

import { Action, Getter } from "vuex-class";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "Habit",
  components: {
    HabitHeader,
    HabitEdit,
    ActivityHeader,
    ActivityChart,
    Datetime,
  },
})
export default class Habit extends Vue {
  // User

  @Getter("user", { namespace: "user" }) user: User | undefined;
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;

  // Habit

  @Getter("getHabit", { namespace: "habit" }) getHabit!: (
    habitId: string
  ) => Habit | null;
  @Action("updateHabit", { namespace: "habit" }) updateHabit: any;
  @Action("deleteHabit", { namespace: "habit" }) deleteHabit: any;

  // Habits
  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;

  // Activity

  @Getter("getActivities", { namespace: "activity" }) getActivities:
    | Activities
    | Array<Activity>
    | undefined;
  @Action("fetchActivities", { namespace: "activity" }) fetchActivities: any;
  @Action("deleteHabitActivities", { namespace: "activity" })
  deleteHabitActivities: any;

  habitId: string | null = null;
  habit: Habit | undefined | null = null;

  editDialog = false;

  mounted() {
    this.fetchUser();
    this.fetchActivities();
  }

  @Watch("$route", {
    immediate: true,
    deep: true,
  })
  onRouteChanged(value: any, oldValue: any) {
    if (!value) return;

    if (value.params.id) {
      this.habitId = value.params.id;
      this.fetchHabit();
    }
  }

  @Watch("habits", {
    immediate: false,
    deep: true,
  })
  onPropertyChanged(value: any, oldValue: any) {
    if (!value) return;

    this.fetchHabit();
  }

  fetchHabit() {
    if (this.habitId) {
      this.habit = this.getHabit(this.habitId);
    }
  }

  handleUpdate(data: {}) {
    this.updateHabit({ habit: this.habit, data: data });
  }

  handleDelete() {
    this.editDialog = false;

    this.deleteHabitActivities(this.habit);
    this.deleteHabit(this.habit);

    this.$router.push({ name: "home" });
  }
}
</script>

<style lang="scss" scoped>
.activityChart,
.activityList {
  margin-top: 32px;
}
</style>
