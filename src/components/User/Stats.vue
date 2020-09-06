<template>
  <v-container v-if="isVisible">
    <v-row>
      <v-col cols="12" sm="12">
        <DayChart :habits="habits" :activities="activities" />
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col cols="12" sm="12">
        <OverallChart :habits="habits" :activities="activities" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import OverallChart from "@/components/User/OverallChart.vue";
import DayChart from "@/components/User/DayChart.vue";

import { Habit } from "@/store/habit/types";
import { Activities, Activity } from "@/store/activity/types";

import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "Stats",
  components: {
    OverallChart,
    DayChart,
  },
})
export default class Stats extends Vue {
  @Prop() private habits!: Array<Habit> | undefined;
  @Prop() private activities!: Activities | Array<Activity> | undefined;

  get isVisible() {
    if (!this.activities) return false;

    return Object.values(this.activities).find((element) => {
      return element.length;
    });
  }
}
</script>

<style scoped lang="scss">
</style>
