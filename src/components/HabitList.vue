<template>
  <div v-if="habits && user">
    <div v-for="habit in habits" :key="habit.name" class="habit">
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

import { Component, Prop, Vue } from "vue-property-decorator";

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

  mounted() {
    this.fetchActivities();
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
