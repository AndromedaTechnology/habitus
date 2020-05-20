<template>
  <v-container class="habitList" v-if="habits && habits.length && user">
    <v-row>
      <v-col cols="12" sm="12">
        <!-- Filter -->

        <div class="filter">
          <v-btn :class="{ active: filter === 'past' }" @click="filter = 'past'">Past</v-btn>
          <v-btn :class="{ active: filter === 'now' }" @click="filter = 'now'">Now</v-btn>
          <v-btn :class="{ active: filter === 'future' }" @click="filter = 'future'">Future</v-btn>
        </div>
      </v-col>
    </v-row>

    <!--  List -->

    <v-row v-if="filteredHabits && filteredHabits.length" class="list">
      <v-col cols="12" sm="12">
        <div v-for="habit in filteredHabits" :key="habit._id" class="habit">
          <HabitHeader :habit="habit" :activities="habitActivities(habit._id)" />

          <ActivityCreate :habit="habit" @submit="activityCreateSubmit(habit, user, $event)" />

          <ActivityChart
            class="activityChart"
            v-if="habitActivities(habit._id)"
            :habit="habit"
            :activities="habitActivities(habit._id)"
          />
        </div>
      </v-col>
    </v-row>

    <v-row v-else class="nothing">
      <v-col cols="12" sm="12">
        <h2>Nothing to show.</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Action, Getter } from "vuex-class";

import { Habit } from "@/store/habit/types";
import { User } from "@/store/user/types";
import { Activity, Activities } from "@/store/activity/types";
import HabitHeader from "@/components/HabitHeader.vue";
import ActivityChart from "@/components/ActivityChart.vue";
import ActivityCreate from "@/components/ActivityCreate.vue";

import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "HabitList",
  components: {
    HabitHeader,
    ActivityChart,
    ActivityCreate
  }
})
export default class HabitList extends Vue {
  @Prop() private habits!: Array<Habit>;
  @Prop() private user!: User;

  // Activity Store
  @Getter("activities", { namespace: "activity" }) activities:
    | Activities
    | undefined;
  @Getter("habitActivities", { namespace: "activity" })
  habitActivities: Array<Activity> | undefined;
  @Action("fetchActivities", { namespace: "activity" }) fetchActivities: any;
  @Action("persistActivity", { namespace: "activity" }) persistActivity: any;
  @Action("deleteActivities", { namespace: "activity" }) deleteActivities: any;

  filter: string | undefined | null = "now";
  filteredHabits: Array<Habit> | undefined | null = null;

  @Watch("filter", {
    immediate: true,
    deep: true
  })
  filterChanged(value: any, oldValue: any) {
    if (!value) return;
    this.filterHabits(value);
  }

  mounted() {
    this.fetchActivities();
  }

  filterHabits(filter: string) {
    this.filteredHabits = this.habits.filter((element: Habit) => {
      // Dates
      const currentDate = new Date();

      const startsAtDate = element.startsAtDate
        ? new Date(element.startsAtDate)
        : null;

      const endsAtDate = element.endsAtDate
        ? new Date(element.endsAtDate)
        : null;

      // Filter
      let isValid = false;

      if (filter === "now") {
        isValid = startsAtDate ? startsAtDate < currentDate : true;
        if (endsAtDate) {
          isValid = isValid && (endsAtDate ? currentDate < endsAtDate : true);
        }
      } else if (filter === "future") {
        isValid = startsAtDate ? currentDate < startsAtDate : true;
      } else if (filter === "past") {
        isValid = startsAtDate ? startsAtDate < currentDate : true;
        isValid = isValid && (endsAtDate ? endsAtDate < currentDate : false);
      }

      return isValid;
    });
  }

  activityCreateSubmit(habit: Habit, user: User, amount: number) {
    this.persistActivity({
      habit: habit,
      user: user,
      amount: amount
    });

    this.fetchActivities();
  }
}
</script>

<style lang="scss" scoped>
.habit {
  margin: 0px 16px 128px;
}

.filter {
  text-align: center;
}

.activityChart,
.nothing {
  margin-top: 32px;
  text-align: center;
}
</style>
