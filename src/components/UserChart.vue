<template>
  <div class="userChart">
    <DoughnutChart v-if="chartData" :chartData="chartData" :options="chartOptions" :height="200"></DoughnutChart>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { Activity } from "@/store/activity/types";
import { Habit } from "@/store/habit/types";
import { Activities } from "@/store/activity/types";
import DoughnutChart from "@/components/DoughnutChart.vue";

@Component({
  components: {
    DoughnutChart
  }
})
export default class UserChart extends Vue {
  @Prop() private habits!: Array<Habit> | undefined;
  @Prop() private activities!: Activities | undefined;

  @Getter("habitActivities", { namespace: "activity" }) habitActivities!: (
    habitId: string
  ) => Array<Activity> | undefined;

  chartOptions = {
    legend: {
      display: true,
      position: "bottom"
    },
    title: {
      display: true,
      position: "top",
      text: "Good and Bad Habits",
      fontSize: 24,
      padding: 24,
      fontColor: "#fff"
    },
    responsive: true,
    maintainAspectRatio: false
  };
  chartData: {} | undefined = {};

  @Watch("activities", {
    immediate: true,
    deep: true
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

    let habits = this.habits;
    habits = habits?.sort((a, b) => (a.isGood > b.isGood ? 1 : -1));

    // Add to chart
    habits?.forEach((habit: Habit) => {
      if (this.habitActivities) {
        const acts = this.habitActivities!(habit._id);
        labels.push(habit.name);
        backgroundColors.push(habit.isGood ? "#42b983" : "#b94278");
        chartData.push(acts ? acts.length : 0);
      }
    });

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: "Activities",
          backgroundColor: backgroundColors,
          borderColor: "#2c3e50",
          pointBackgroundColor: "#fff",
          data: chartData
        }
      ]
    };
  }
}
</script>

<style scoped lang="scss"></style>
