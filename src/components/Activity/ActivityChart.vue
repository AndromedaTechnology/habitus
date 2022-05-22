<template>
  <div class="chartContainer">
    <chart v-if="chartData" :chartData="chartData" :options="chartOptions" :height="300"></chart>
  </div>
</template>
<script lang="ts">
import { COLORS } from "@/helpers/enums";
import { Habit } from "@/store/habit/types";
import Chart from "@/components/Chart/Chart.vue";
import { Activity } from "@/store/activity/types";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {
    Chart,
  },
})
export default class ActivityChart extends Vue {
  @Prop() private habit!: Habit;
  @Prop() private activities!: Array<Activity>;

  colors: any = COLORS;

  chartOptions = {
    backgroundColor: "rgba(251, 85, 85, 0.2)",
    legend: {
      display: false,
      position: "bottom",
    },
    tooltips: {
      enabled: true,
    },
    scales: {
      xAxes: [{ display: false }],
      yAxes: [{ display: true, ticks: { fontSize: 16 } }],
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
    if (!value) return;
    this.recalculate(value);
  }

  recalculate(activities: Array<Activity>) {
    const labels: string[] = [];
    const chartData: number[] = [];

    activities.forEach((activity: Activity) => {
      labels.push(activity.createdAt.toString());

      let amount = 0;
      if (typeof activity.amount === "string") {
        amount = parseInt(activity.amount);
      } else if (activity.amount) {
        amount = activity.amount;
      }

      chartData.push(amount);
    });

    this.chartData = {
      labels: labels,
      datasets: [
        {
          data: chartData,
          label: "Amount",
          borderColor: this.habit.isGood ? this.colors.GOOD : this.colors.BAD,
          borderWidth: 5,
          fill: false,
        },
      ],
    };
  }
}
</script>

<style lang="scss">
.chartContainer {
  canvas {
    max-width: 100% !important;
  }
}
</style>
