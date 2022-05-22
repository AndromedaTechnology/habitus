<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" lg="6" class="px-0">
        <v-alert elevation="12" class="px-0 py-4">
          <DayChart
            class="pt-6"
            :habits="habits"
            :activities="activities"
            :dateStart="dateStart"
            :dateEnd="dateEnd"
          />
        </v-alert>
      </v-col>
      <v-col cols="12" sm="12" lg="6" class="px-0">
        <v-alert elevation="12" class="px-0 py-4">
          <OverallChart
            class="pt-6"
            :habits="habits"
            :activities="activities"
            :dateStart="dateStart"
            :dateEnd="dateEnd"
          />
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Habit } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";
import DayChart from "@/components/User/DayChart.vue";
import OverallChart from "@/components/User/OverallChart.vue";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "Stats",
  components: {
    DayChart,
    OverallChart,
  },
})
export default class Stats extends Vue {
  @Prop() private habits!: Array<Habit> | undefined;
  @Prop() private activities!: Array<Activity> | undefined;
  @Prop() private dateStart!: Date | undefined;
  @Prop() private dateEnd!: Date | undefined;

  get isVisible() {
    return this.activities && this.activities.length;
  }
}
</script>
