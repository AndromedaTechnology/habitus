<template>
  <div>
    <BarChart v-if="chartData" :chartData="chartData" :options="chartOptions" :height="320"></BarChart>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { Activity } from "@/store/activity/types";
import { Habit } from "@/store/habit/types";
import { Activities } from "@/store/activity/types";
import BarChart from "@/components/BarChart.vue";

@Component({
  components: {
    BarChart
  }
})
export default class UserChart extends Vue {
  @Prop() private habits!: Array<Habit> | undefined;
  @Prop() private activities!: Activities | undefined;

  @Getter("getActivities", { namespace: "activity" }) getActivities!: (
    habitId: string,
    descending: false,
    dateStart: Date,
    dateEnd: Date
  ) => Array<Activity> | undefined;

  chartOptions = {
    legend: {
      display: false
    },
    title: {
      display: true,
      position: "top",
      text: "Today",
      fontSize: 24,
      padding: 24,
      fontColor: "#fff"
    },
    scales: {
      yAxes: [
        {
          display: false
        }
      ],
      xAxes: [
        {
          display: true,

          ticks: {
            fontSize: 16
          }
        }
      ]
    },
    dataset: {
      categoryPercentage: 1.0,
      barPercentage: 0.97
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
    const datasets: Array<{
      label: string;
      backgroundColor: string;
      borderColor: string;
      pointBackgroundColor: string;
      data: Array<number>;
    }> = [];

    // Sort habits by isGood
    // (to group good/bad habits)

    let habits = this.habits;
    habits = habits?.sort((a, b) => (a.isGood > b.isGood ? 1 : -1));

    // Labels: 0-24
    const hourStep = 8;
    labels.push("Morning");
    labels.push("Day");
    labels.push("Evening");

    habits?.forEach((habit: Habit) => {
      datasets.push({
        label: habit.name,
        backgroundColor: habit.isGood ? "#42b983" : "#b94278",
        borderColor: "#2c3e50",
        pointBackgroundColor: "#fff",
        data: []
      });

      // 0-24
      for (let hour = 0; hour < 24; hour += hourStep) {
        const dateStart = new Date();
        const dateEnd = new Date();

        dateStart.setHours(hour);
        dateStart.setMinutes(0);
        dateStart.setSeconds(0);
        dateEnd.setHours(hour + hourStep);
        dateEnd.setMinutes(0);
        dateEnd.setSeconds(0);

        const acts = this.getActivities(habit._id, false, dateStart, dateEnd);
        datasets[datasets.length - 1].data.push(acts ? acts.length : 0);
      }
    });

    this.chartData = {
      labels: labels,
      datasets: datasets
    };
  }
}
</script>

<style scoped lang="scss"></style>
