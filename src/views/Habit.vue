<template>
  <div v-if="user && habit">
    <!-- Header -->
    <HabitHeader v-if="habit" :habit="habit" :activities="habitActivities(habit._id)" />

    <!-- Delete Habit -->
    <button class="btn-dark delete" @click="habitDeleteSubmit(habit)">Delete</button>

    <!--  Add Activity -->

    <ActivityCreate @submit="activityCreateSubmit(habit._id, user._id, $event)" />
    <br />

    <!--  Activity Chart -->

    <ActivityChart
      v-if="heatmapHabitActivities(habit._id)"
      :activities="heatmapHabitActivities(habit._id)"
    />

    <!-- Activity List -->

    <div v-for="activity in habitActivities(habit._id)" :key="activity._id" class="activities">
      <ActivityHeader :activity="activity" @delete="activityDeleteSubmit($event)" />
    </div>
  </div>
</template>

<script lang="ts">
import HabitHeader from "../components/HabitHeader.vue";
import ActivityCreate from "@/components/ActivityCreate.vue";
import ActivityHeader from "@/components/ActivityHeader.vue";
import ActivityChart from "@/components/ActivityChart.vue";

import { User } from "@/store/user/types";
import { Activity } from "@/store/activity/types";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { State, Action, Getter } from "vuex-class";

@Component({
  name: "Habit",
  components: {
    HabitHeader,
    ActivityCreate,
    ActivityChart,
    ActivityHeader
  }
})
export default class Habit extends Vue {
  // User
  @Getter("user", { namespace: "user" }) user: User | undefined;
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;

  // Habits
  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;
  @Action("deleteHabit", { namespace: "habit" }) deleteHabit: any;
  @Getter("getHabit", { namespace: "habit" }) getHabit!: (
    habitId: string
  ) => Habit | undefined;
  @Getter("habitActivities", { namespace: "activity" }) habitActivities:
    | Array<Activity>
    | undefined;
  @Getter("heatmapHabitActivities", { namespace: "activity" })
  heatmapHabitActivities: Array<Activity> | undefined;

  // Activity
  @Action("persistActivity", { namespace: "activity" }) persistActivity: any;
  @Action("fetchActivities", { namespace: "activity" }) fetchActivities: any;
  @Action("deleteHabitActivities", { namespace: "activity" })
  deleteHabitActivities: any;
  @Action("deleteHabitActivity", { namespace: "activity" })
  deleteHabitActivity: any;

  habitId: string | null = null;
  habit: Habit | undefined | null = null;

  mounted() {
    this.habitId = this.$route.params.id;
    this.fetchHabits();
    this.fetchUser();
    this.fetchActivities();
  }

  @Watch("habits", {
    immediate: false,
    deep: true
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

  activityCreateSubmit(habitId: string, userId: string, amount: number) {
    this.persistActivity({
      habitId: habitId,
      userId: userId,
      amount: amount
    });
    this.fetchActivities();
  }

  activityDeleteSubmit(activity: Activity) {
    this.deleteHabitActivity(activity);
  }

  habitDeleteSubmit(habit: Habit) {
    this.deleteHabit(habit);
    this.deleteHabitActivities(habit);
    this.$router.push({ name: "home" });
  }
}
</script>
