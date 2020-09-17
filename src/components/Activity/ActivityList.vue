<template>
  <div>
    <div v-for="activity in activities" :key="activity.id">
      <ActivityHeader :habit="getHabit(activity.habitId)" :activity="activity" :showHabit="true" />
    </div>
  </div>
</template>

<script lang="ts">
import ActivityHeader from "@/components/Activity/ActivityHeader.vue";

import { Habit } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";

import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component({
  components: {
    ActivityHeader,
  },
})
export default class ActivityList extends Vue {
  @Prop() private activities!: Array<Activity>;

  @Getter("getHabit", { namespace: "habit" }) getHabit!: (
    habitId: string
  ) => Habit | null;
}
</script>

<style scoped lang="scss">
</style>
