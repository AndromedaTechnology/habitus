<template>
  <div v-if="user && habit">
    <!-- Header -->
    <HabitHeader
      v-if="habit"
      :habit="habit"
      :activities="habitActivities(habit._id)"
    />

    <!-- Delete  -->
    <button class="btn-dark delete" @click="habitDeleteSubmit(habit)">
      Delete
    </button>

    <!-- Type -->
    <div class="typeContainer">
      <p>Type:</p>
      <select v-model="type">
        <option value="amount">Amount (default)</option>
        <option value="timer">Timer</option>
        <option value="check">Check</option>
      </select>
    </div>

    <!-- Starts At Date -->
    <div class="startsAtDateContainer">
      <p>Starts At:</p>
      <datetime
        class="startsAtDate"
        v-model="startsAtDate"
        type="datetime"
        title="Start at"
      ></datetime>
    </div>

    <!--  Add Activity -->
    <div class="activityCreate">
      <p>Add Activity:</p>
      <ActivityCreate
        @submit="activityCreateSubmit(habit._id, user._id, $event)"
      />
    </div>

    <!--  Activity Chart -->
    <ActivityChart
      v-if="heatmapHabitActivities(habit._id)"
      class="activityChart"
      :activities="heatmapHabitActivities(habit._id)"
    />

    <!-- Activity List -->
    <div
      v-for="activity in habitActivities(habit._id)"
      :key="activity._id"
      class="activities"
    >
      <ActivityHeader
        :activity="activity"
        @delete="activityDeleteSubmit($event)"
      />
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

import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import { State, Action, Getter, Mutation } from "vuex-class";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "Habit",
  components: {
    HabitHeader,
    ActivityCreate,
    ActivityChart,
    ActivityHeader,
    Datetime,
  },
})
export default class Habit extends Vue {
  // User
  @Getter("user", { namespace: "user" }) user: User | undefined;
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;

  // Habits
  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Action("updateHabit", { namespace: "habit" }) updateHabit: any;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;
  @Action("deleteHabit", { namespace: "habit" }) deleteHabit: any;
  @Getter("getHabit", { namespace: "habit" }) getHabit!: (
    habitId: string
  ) => Promise<Habit | undefined>;
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
  startsAtDate: Date | undefined | null = null;
  type: string | undefined | null = null;

  mounted() {
    this.habitId = this.$route.params.id;
    this.fetchHabits();
    this.fetchUser();
    this.fetchActivities();
  }

  @Watch("habits", {
    immediate: false,
    deep: true,
  })
  onPropertyChanged(value: any, oldValue: any) {
    if (!value) return;
    this.fetchHabit();
  }

  @Watch("habit", {
    immediate: false,
    deep: true,
  })
  habitChanged(value: any, oldValue: any) {
    if (!value) return;
    this.startsAtDate = value.startsAtDate;
  }

  @Watch("startsAtDate", {
    immediate: false,
    deep: true,
  })
  startsAtDateChanged(value: any, oldValue: any) {
    this.updateHabit({ habit: this.habit, data: { startsAtDate: value } });
  }

  @Watch("type", {
    immediate: false,
    deep: true,
  })
  typeChanged(value: any, oldValue: any) {
    this.updateHabit({ habit: this.habit, data: { type: value } });
  }

  fetchHabit() {
    if (this.habitId) {
      this.getHabit(this.habitId).then((resp) => {
        this.habit = resp;
        this.startsAtDate = this.habit?.startsAtDate;
        this.type = this.habit?.type;
      });
    }
  }

  activityCreateSubmit(habitId: string, userId: string, amount: number) {
    this.persistActivity({
      habitId: habitId,
      userId: userId,
      amount: amount,
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

<style lang="scss" scoped>
.activityCreate {
  margin-top: 8px;
}
.activityChart {
  margin-top: 8px;
}
button.delete {
  margin-top: 8px;
}
.startsAtDateContainer {
  margin-top: 8px;
}
</style>
