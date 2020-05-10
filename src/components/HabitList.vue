<template>
  <div v-if="habits && user">
    <!-- FIlter -->

    <div class="filter">
      <button
        :class="{ 'btn-dark': true, active: filter === 'now' }"
        @click="filter = 'now'"
      >
        Now
      </button>
      <button
        :class="{ 'btn-dark': true, active: filter === 'future' }"
        @click="filter = 'future'"
      >
        Future
      </button>
      <button
        :class="{ 'btn-dark': true, active: filter === 'past' }"
        @click="filter = 'past'"
      >
        Past
      </button>
    </div>

    <!--  List -->

    <div v-for="habit in filteredHabits" :key="habit._id" class="habit">
      <HabitHeader
        :habit="habit"
        :activities="heatmapHabitActivities(habit._id)"
      />

      <ActivityCreate
        :habit="habit"
        @submit="activityCreateSubmit(habit._id, user._id, $event)"
      />

      <ActivityChart
        class="activityChart"
        v-if="heatmapHabitActivities(habit._id)"
        :activities="heatmapHabitActivities(habit._id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Action, Getter } from "vuex-class";

import { Habit } from "@/store/habit/types";
import { User } from "@/store/user/types";
import { Activity, Activities } from "@/store/activity/types";
import HabitHeader from "@/components/HabitHeader.vue";
import ActivityChart from "@/components/ActivityChart.vue";
import ActivityCreate from "@/components/ActivityCreate.vue";

import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "HabitList",
  components: {
    HabitHeader,
    ActivityChart,
    ActivityCreate,
  },
})
export default class HabitList extends Vue {
  @Prop() private habits!: Array<Habit>;
  @Prop() private user!: User;

  // Activity Store
  @Getter("activities", { namespace: "activity" }) activities:
    | Activities
    | undefined;
  @Getter("heatmapHabitActivities", { namespace: "activity" })
  heatmapHabitActivities: Array<Activity> | undefined;
  @Action("fetchActivities", { namespace: "activity" }) fetchActivities: any;
  @Action("persistActivity", { namespace: "activity" }) persistActivity: any;
  @Action("deleteActivities", { namespace: "activity" }) deleteActivities: any;

  filter: string | undefined | null = "now";
  filteredHabits: Array<Habit> | undefined | null = null;

  @Watch("filter", {
    immediate: true,
    deep: true,
  })
  filterChanged(value: any, oldValue: any) {
    if (!value) return;
    this.filterHabits(value);
  }

  mounted() {
    this.fetchActivities();
  }

  filterHabits(filter: string) {
    this.filteredHabits = this.habits.filter((element: Habit) => {
      // Dates
      const currentDate = new Date();

      const startsAtDate = element.startsAtDate
        ? new Date(element.startsAtDate)
        : null;

      const endsAtDate = element.endsAtDate
        ? new Date(element.endsAtDate)
        : null;

      // Filter
      let isValid = false;

      if (filter === "now") {
        isValid = startsAtDate ? startsAtDate < currentDate : true;
        if (endsAtDate) {
          isValid = isValid && (endsAtDate ? currentDate < endsAtDate : true);
        }
      } else if (filter === "future") {
        isValid = startsAtDate ? currentDate < startsAtDate : true;
      } else if (filter === "past") {
        isValid = startsAtDate ? startsAtDate < currentDate : true;
        isValid = isValid && (endsAtDate ? endsAtDate < currentDate : false);
      }

      return isValid;
    });
  }

  activityCreateSubmit(habitId: string, userId: string, amount: number) {
    this.persistActivity({
      habitId: habitId,
      userId: userId,
      amount: amount,
    });
    this.fetchActivities();
  }
}
</script>

<style lang="scss" scoped>
.habit {
  margin: 16px;
}
@media (min-width: 768px) {
  .habit {
    margin: 64px;
  }
}

.activityChart {
  margin-top: 8px;
}
</style>
