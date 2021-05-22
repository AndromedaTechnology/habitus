<template>
  <v-container v-if="isVisible">
    <v-row class="my-12">
      <v-col cols="12" sm="12" md="6">
        <OverallChart :habits="habits" :activities="activities" />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <DayChart :habits="habits" :activities="activities" />
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

  get isVisible() {
    return this.activities && this.activities.length;
  }
}
</script>
