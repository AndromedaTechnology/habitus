<template>
  <div class="habitHeader">
    <div class="pb-12">
      <router-link
        :to="{ name: 'habit', params: { id: habit._id } }"
        :class="{ habitLink: true, isBad: !habit.isGood }"
      >
        <!-- Name -->
        <h1 class="my-12 display-2 font-weight-bold">
          <span v-if="habit.emoji">{{ habit.emoji }}</span>
          &nbsp;
          <span v-if="habit.name">{{ habit.name }}</span>
        </h1>
      </router-link>
    </div>
    <v-toolbar>
      <span class="mx-auto">
        <!-- Health -->
        <v-chip
          label
          class="px-8 mx-4"
          :color="getHabitHealth(habit) >= 0 ? colors.GOOD : colors.BAD"
        >
          <h2>
            {{
              getHabitHealth(habit) >= 0
                ? "+" + getHabitHealth(habit)
                : getHabitHealth(habit)
            }}
            HEALTH
          </h2>
        </v-chip>
        <!-- Streak -->
        <HabitStreak
          v-if="showStreak"
          class="streak"
          :habit="habit"
          :activities="activities"
        />
      </span>
    </v-toolbar>
  </div>
</template>
<script lang="ts">
import { Getter } from "vuex-class";
import { COLORS } from "@/helpers/enums";
import { Habit } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";
import HabitStreak from "@/components/Habit/HabitStreak.vue";
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
  @Getter("getHabitHealth", { namespace: "activity" }) getHabitHealth: any;

  colors: any = COLORS;
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
