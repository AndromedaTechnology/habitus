<template>
  <div>
    <DoughnutChart
      :chartData="chartData"
      :options="chartOptions"
      :height="320"
    ></DoughnutChart>
  </div>
</template>
<script lang="ts">
import { Getter } from "vuex-class";
import { COLORS } from "@/helpers/enums";
import { Habit } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";
import { HabitHelpers } from '@/store/habit/helpers';
import DoughnutChart from "@/components/Chart/DoughnutChart.vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {
    DoughnutChart,
  },
})
export default class OverallChart extends Vue {
  @Prop() private habits!: Array<Habit> | undefined;
  @Prop() private activities!: Array<Activity> | undefined;
  @Prop() private dateStart!: Date | undefined;
  @Prop() private dateEnd!: Date | undefined;

  @Getter("getActivities", { namespace: "activity" }) getActivities!: (
    habitId: string | undefined,
    isDescending?: boolean,
    dateStart?: Date,
    dateEnd?: Date
  ) => Array<Activity> | undefined;

  colors: any = COLORS;

  chartOptions = {
    legend: {
      display: false,
    },
    title: {
      display: true,
      position: "top",
      text: "Ratio",
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
    this.recalculate();
  }

  recalculate() {
    const labels: string[] = [];
    const chartData: number[] = [];
    const backgroundColors: string[] = [];

    // Sort habits by isGood
    // (to group good/bad habits)

    let habits = this.habits?.slice();
    habits = HabitHelpers.sortHabitsByIsGood(habits);

    // Add to chart
    habits?.forEach((habit: Habit) => {
      const acts = this.getActivities(habit._id, false, this.dateStart, this.dateEnd);
      labels.push(habit.name ?? "");
      backgroundColors.push(habit.isGood ? this.colors.GOOD : this.colors.BAD);
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
