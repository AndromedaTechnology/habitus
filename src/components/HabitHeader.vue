<template>
  <div class="habitHeader">
    <router-link
      :to="{ name: 'habit', params: { id: habit._id } }"
      :class="{ habitLink: true, isBad: !habit.isGood }"
    >
      <HabitStreak v-if="showStreak" class="streak mb-4" :habit="habit" :activities="activities" />
      <h1>
        <span>{{ habit.name }}</span>
      </h1>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Habit } from "../store/habit/types";
import { Activity } from "../store/activity/types";
import HabitStreak from "@/components/HabitStreak.vue";

@Component({
  components: {
    HabitStreak
  }
})
export default class HabitHeader extends Vue {
  @Prop() private habit!: Habit;
  @Prop() private activities!: Array<Activity> | undefined;
  @Prop({ default: false, type: Boolean }) showStreak?: boolean;
}
</script>

<style scoped lang="scss">
$activeLinkColor: #42b983;
$activeLinkBadColor: #b94278;
.habitHeader {
  text-align: center;
  margin: 32px 0px;
}

.habitLink {
  color: $activeLinkColor;
  &.isBad {
    color: $activeLinkBadColor;
  }
}
</style>
