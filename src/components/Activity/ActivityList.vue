<template>
  <div>
    <div v-if="activities && activities.length">
      <ActivityHeader
        v-for="activity in activities"
        :habit="getHabit(activity.habitId)"
        :activity="activity"
        :showHabit="true"
        :key="activity.id"
        class="my-12"
      />
    </div>
    <v-alert type="info" v-else>
      <h2>Nothing to show.</h2>
      <h3>Add activity or select a different date.</h3>
    </v-alert>
  </div>
</template>
<script lang="ts">
import { Getter } from "vuex-class";
import { Habit } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";
import { Component, Prop, Vue } from "vue-property-decorator";
import ActivityHeader from "@/components/Activity/ActivityHeader.vue";
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
