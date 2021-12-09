<template>
  <div>
    <BarChart v-if="chartData" :chartData="chartData" :options="chartOptions" :height="320"></BarChart>
  </div>
</template>
<script lang="ts">
import { Getter } from "vuex-class";
import { COLORS } from "@/helpers/enums";
import { Habit } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";
import BarChart from "@/components/Chart/BarChart.vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {
    BarChart,
  },
})
export default class UserChart extends Vue {
  @Prop() private habits!: Array<Habit> | undefined;
  @Prop() private activities!: Array<Activity> | undefined;
  @Prop() private dateStart!: Date;
  @Prop() private dateEnd!: Date;
  @Getter("getHabitHealth", { namespace: "activity" }) getHabitHealth: any;

  colors: any = COLORS;

  chartOptions = {
    legend: {
      display: false,
    },
    title: {
      display: true,
      position: "top",
      text: "Time of the day",
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
    this.recalculate();
  }

  recalculate() {
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
      backgroundColor: this.colors.GOOD,
      borderColor: "#2c3e50",
      pointBackgroundColor: "#fff",
      data: [],
    });

    datasets.push({
      label: "Bad Health",
      backgroundColor: this.colors.BAD,
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
      const dateStart = new Date(this.dateStart);
      dateStart.setHours(hour);
      dateStart.setMinutes(0);
      dateStart.setSeconds(0);

      // Date End
      const dateEnd = new Date(this.dateEnd);
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
