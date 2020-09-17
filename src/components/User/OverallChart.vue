<template>
  <div>
    <DoughnutChart v-if="chartData" :chartData="chartData" :options="chartOptions" :height="320"></DoughnutChart>
  </div>
</template>

<script lang="ts">
import DoughnutChart from "@/components/Chart/DoughnutChart.vue";

import { Activity } from "@/store/activity/types";
import { Habit } from "@/store/habit/types";
import { Activities } from "@/store/activity/types";

import { State, Action, Getter } from "vuex-class";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {
    DoughnutChart,
  },
})
export default class OverallChart extends Vue {
  @Prop() private habits!: Array<Habit> | undefined;
  @Prop() private activities!: Activities | undefined;

  @Getter("getActivities", { namespace: "activity" }) getActivities!: (
    habitId: string
  ) => Array<Activity> | undefined;

  chartOptions = {
    legend: {
      display: false,
    },
    title: {
      display: true,
      position: "top",
      text: "Total",
      fontSize: 24,
      padding: 24,
      fontColor: "#fff",
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  chartData: {} | undefined = {};

  @Watch("activities", {
    immediate: true,
    deep: true,
  })
  onPropertyChanged(value: any, oldValue: any) {
    this.recalculate(value);
  }

  recalculate(activities: Activities | undefined) {
    const labels: string[] = [];
    const chartData: number[] = [];
    const backgroundColors: string[] = [];

    // Sort habits by isGood
    // (to group good/bad habits)

    let habits = this.habits?.slice();
    habits = habits?.sort((a, b) => (a.isGood > b.isGood ? 1 : -1));

    // Add to chart
    habits?.forEach((habit: Habit) => {
      const acts = this.getActivities(habit._id);
      labels.push(habit.name);
      backgroundColors.push(habit.isGood ? "#42b983" : "#b94278");
      chartData.push(acts ? acts.length : 0);
    });

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: "Activities",
          backgroundColor: backgroundColors,
          borderColor: "#2c3e50",
          pointBackgroundColor: "#fff",
          data: chartData,
        },
      ],
    };
  }
}
</script>

<style scoped lang="scss"></style>
