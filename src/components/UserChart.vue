<template>
  <div class="userChart">
    <RadarChart
      v-if="chartData"
      :chartData="chartData"
      :options="chartOptions"
      :height="200"
    ></RadarChart>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { Activity } from "@/store/activity/types";
import { Habit } from "@/store/habit/types";
import { Activities } from "@/store/activity/types";
import RadarChart from "@/components/RadarChart.vue";

@Component({
  components: {
    RadarChart,
  },
})
export default class UserChart extends Vue {
  @Prop() private habits!: Array<Habit> | undefined;
  @Prop() private activities!: Activities | undefined;

  @Getter("habitActivities", { namespace: "activity" }) habitActivities!: (
    habitId: string
  ) => Array<Activity> | undefined;

  chartOptions = {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: false,
      text: "Performance",
    },
    scale: {
      ticks: {
        beginAtZero: true,
      },
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

    this.habits?.forEach((habit: Habit) => {
      labels.push(habit.name);

      if (this.habitActivities) {
        const acts = this.habitActivities!(habit._id);
        chartData.push(acts ? acts.length : 0);
      }
    });

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: "Activities",
          backgroundColor: "#42b983",
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
