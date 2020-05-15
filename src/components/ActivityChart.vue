<template>
  <div class="activityChart">
    <chart
      v-if="chartData"
      :chartData="chartData"
      :options="chartOptions"
      :height="200"
    ></chart>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Activity } from "../store/activity/types";
import Chart from "@/components/Chart.vue";

@Component({
  components: {
    Chart,
  },
})
export default class ActivityChart extends Vue {
  @Prop() private activities!: Array<Activity>;

  chartOptions = {
    backgroundColor: "rgba(251, 85, 85, 0.4)",
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
    this.recalculate(value);
  }

  recalculate(activities: Array<Activity>) {
    const labels: string[] = [];
    const chartData: number[] = [];

    activities.forEach((activity: Activity) => {
      labels.push(activity.createdAt.toString());

      let amount: number | string = activity.amount;
      if (typeof amount === "string") {
        amount = parseInt(amount);
      }

      chartData.push(amount);
    });

    this.chartData = {
      labels: labels,
      datasets: [
        {
          data: chartData,
          label: "Activity",
          borderColor: "#42b983",
          borderWidth: 5,
          fill: false,
        },
      ],
    };
  }
}
</script>

<style scoped lang="scss"></style>
