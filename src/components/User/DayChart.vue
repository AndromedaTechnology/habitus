<template>
  <div>
    <BarChart v-if="chartData" :chartData="chartData" :options="chartOptions" :height="320"></BarChart>
  </div>
</template>

<script lang="ts">
import BarChart from "@/components/Chart/BarChart.vue";

import { Activity } from "@/store/activity/types";
import { Habit } from "@/store/habit/types";
import { Activities } from "@/store/activity/types";

import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component({
  components: {
    BarChart,
  },
})
export default class UserChart extends Vue {
  @Prop() private habits!: Array<Habit> | undefined;
  @Prop() private activities!: Activities | undefined;

  @Getter("getHabitHealth", { namespace: "activity" })
  getHabitHealth: any;

  chartOptions = {
    legend: {
      display: false,
    },
    title: {
      display: true,
      position: "top",
      text: "Today",
      fontSize: 24,
      padding: 24,
      fontColor: "#fff",
    },
    scales: {
      yAxes: [
        {
          display: false,
        },
      ],
      xAxes: [
        {
          display: true,
          ticks: {
            fontSize: 16,
          },
        },
      ],
    },
    dataset: {
      categoryPercentage: 1.0,
      barPercentage: 0.97,
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
    const datasets: Array<{
      label: string;
      backgroundColor: string;
      borderColor: string;
      pointBackgroundColor: string;
      data: Array<number>;
    }> = [];

    datasets.push({
      label: "Good Health",
      backgroundColor: "#42b983",
      borderColor: "#2c3e50",
      pointBackgroundColor: "#fff",
      data: [],
    });

    datasets.push({
      label: "Bad Health",
      backgroundColor: "#b94278",
      borderColor: "#2c3e50",
      pointBackgroundColor: "#fff",
      data: [],
    });

    // Timeframe: 1 day, 3 sections

    const hourStep = 8;
    labels.push("Morning");
    labels.push("Afternoon");
    labels.push("Evening");

    for (let hour = 0; hour < 24; hour += hourStep) {
      // Date Start
      const dateStart = new Date();
      dateStart.setHours(hour);
      dateStart.setMinutes(0);
      dateStart.setSeconds(0);

      // Date End
      const dateEnd = new Date();
      dateEnd.setHours(hour + hourStep);
      dateEnd.setMinutes(0);
      dateEnd.setSeconds(0);

      // Get Good and Bad Health
      // per timeframe

      let amountGood = 0;
      let amountBad = 0;

      this.habits?.forEach((habit: Habit) => {
        const health = this.getHabitHealth(habit, dateStart, dateEnd);

        if (habit.isGood) {
          amountGood += health;
        } else {
          amountBad += health;
        }
      });

      // Add Good Health
      datasets[0].data.push(amountGood);

      // Add Bad Health
      datasets[1].data.push(amountBad);
    }

    this.chartData = {
      labels: labels,
      datasets: datasets,
    };
  }
}
</script>

<style scoped lang="scss"></style>
