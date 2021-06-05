<template>
  <div class="habitHeader">
    <router-link
      :to="{ name: 'habit', params: { id: habit._id } }"
      :class="{ habitLink: true, isBad: !habit.isGood }"
    >
      <!-- Name -->
      <h1>
        <span v-if="habit.emoji">{{ habit.emoji }}</span>
        &nbsp;
        <span v-if="habit.name">{{ habit.name }}</span>
      </h1>
      <!-- Health -->
      <div class="mt-4">
        <v-chip :color="getHabitHealth(habit) >= 0 ? colors.GOOD : colors.BAD">
          <h3>
            {{
              getHabitHealth(habit) >= 0
                ? "+" + getHabitHealth(habit)
                : getHabitHealth(habit)
            }}
            HEALTH
          </h3>
        </v-chip>
      </div>
      <!-- Streak -->
      <HabitStreak
        v-if="showStreak"
        class="streak mb-4"
        :habit="habit"
        :activities="activities"
      />
    </router-link>
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
