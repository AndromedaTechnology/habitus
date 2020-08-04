<template>
  <div class="habitHeader">
    <router-link
      :to="{ name: 'habit', params: { id: habit._id } }"
      :class="{ habitLink: true, isBad: !habit.isGood }"
    >
      <!-- Name -->
      <h1>
        <span>{{ habit.name }}</span>
      </h1>

      <!-- Health -->
      <div class="mt-4">
        <v-chip :color="getHabitHealth(habit) >= 0 ? '#42b983' : '#b94278'">
          <h4>{{ getHabitHealth(habit) >= 0 ? '+' + getHabitHealth(habit) : getHabitHealth(habit) }} HEALTH</h4>
        </v-chip>
      </div>

      <!-- Streak -->
      <HabitStreak v-if="showStreak" class="streak mb-4" :habit="habit" :activities="activities" />
    </router-link>
  </div>
</template>

<script lang="ts">
import HabitStreak from "@/components/Habit/HabitStreak.vue";

import { Habit } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";

import { Getter } from "vuex-class";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    HabitStreak,
  },
})
export default class HabitHeader extends Vue {
  @Prop() private habit!: Habit;
  @Prop() private activities!: Array<Activity> | undefined;
  @Prop({ default: false, type: Boolean }) showStreak?: boolean;

  @Getter("getHabitHealth", { namespace: "activity" })
  getHabitHealth: any;
}
</script>

<style scoped lang="scss">
$activeLinkColor: #42b983;
$activeLinkBadColor: #b94278;
.habitHeader {
  text-align: center;
}

.habitLink {
  color: $activeLinkColor;
  &.isBad {
    color: $activeLinkBadColor;
  }
}
</style>
