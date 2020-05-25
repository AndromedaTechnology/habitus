<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <UserChart :habits="habits" :activities="activities" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import UserChart from "@/components/UserChart.vue";

import { Habit } from "@/store/habit/types";
import { Activities } from "@/store/activity/types";

import { Action, Getter } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    UserChart
  }
})
export default class Stats extends Vue {
  // Habits
  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;

  // Activities
  @Getter("activities", { namespace: "activity" }) activities:
    | Activities
    | undefined;
  @Action("fetchActivities", { namespace: "activity" }) fetchActivities: any;

  mounted() {
    this.fetchHabits();
    this.fetchActivities();
  }
}
</script>

<style scoped lang="scss">
</style>
