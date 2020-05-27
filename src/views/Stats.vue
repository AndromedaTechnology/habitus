<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <Stats :habits="habits" :activities="getActivities()" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Habit } from "@/store/habit/types";
import { Activities, Activity } from "@/store/activity/types";

import Stats from "@/components/Stats.vue";

import Vue from "vue";
import { Action, Getter } from "vuex-class";
import Component from "vue-class-component";

@Component({
  name: "StatsView",
  components: {
    Stats
  }
})
export default class StatsView extends Vue {
  // Habits
  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;

  // Activities
  @Getter("getActivities", { namespace: "activity" })
  getActivities: Activities | Array<Activity> | undefined;
  @Action("fetchActivities", { namespace: "activity" }) fetchActivities: any;

  mounted() {
    this.fetchHabits();
    this.fetchActivities();
  }
}
</script>

<style lang="scss" scoped>
</style>
