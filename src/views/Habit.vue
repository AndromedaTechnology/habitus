<template>
  <div v-if="currentUser && habit">
    <v-alert text class="pa-0">
      <!-- Edit Button -->
      <div class="text-center pt-12 mt-12">
        <v-btn v-show="isEditable" @click="editDialog = true" large>
          <v-icon class="pr-4">edit</v-icon>
          <h3>Edit</h3>
        </v-btn>
      </div>
      <!-- Edit Dialog -->
      <v-dialog
        v-model="editDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <HabitEdit
          :habit="habit"
          @update="handleUpdate($event)"
          @delete="handleDelete()"
          @close="editDialog = false"
        />
      </v-dialog>
      <!-- Header -->
      <HabitHeader
        class="text-center"
        v-if="habit"
        :showStreak="true"
        :habit="habit"
        :activities="getActivities(habit._id)"
      />
    </v-alert>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="8" offset-sm="2">
          <v-alert elevation="12">
            <!--  Activity Chart -->
            <ActivityChart
              v-if="getActivities(habit._id)"
              class="mt-4"
              :habit="habit"
              :activities="getActivities(habit._id)"
            />
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="8" offset-sm="2">
          <!-- Activity List -->
          <div class="mt-12">
            <ActivityHeader
              v-for="activity in getActivities(habit._id, true)"
              :key="activity._id"
              :habit="habit"
              :activity="activity"
              class="my-12"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import { Datetime } from "vue-datetime";
import { User } from "@/store/user/types";
import "vue-datetime/dist/vue-datetime.css";
import { Action, Getter } from "vuex-class";
import { Habit as HabitType } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";
import HabitEdit from "@/components/Habit/HabitEdit.vue";
import HabitHeader from "@/components/Habit/HabitHeader.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import ActivityChart from "@/components/Activity/ActivityChart.vue";
import ActivityHeader from "@/components/Activity/ActivityHeader.vue";
@Component({
  name: "Habit",
  components: {
    HabitHeader,
    HabitEdit,
    ActivityHeader,
    ActivityChart,
    Datetime,
  },
})
export default class Habit extends Vue {
  // CurrentUser
  @Getter("currentUser", { namespace: "user" }) currentUser: User | undefined;
  // Habit
  @Getter("getHabit", { namespace: "habit" }) getHabit!: (
    habitId: string
  ) => HabitType | null;
  @Action("updateHabit", { namespace: "habit" }) updateHabit: any;
  @Action("deleteHabit", { namespace: "habit" }) deleteHabit: any;
  // Habits
  @Getter("habits", { namespace: "habit" }) habits: Array<HabitType> | undefined;
  // Activity
  @Getter("getActivities", { namespace: "activity" }) getActivities:
    | Array<Activity>
    | undefined;
  @Action("deleteHabitActivities", { namespace: "activity" })
  deleteHabitActivities!: (habitId: string) => any;

  editDialog = false;
  habitId: string | null = null;
  habit: HabitType | undefined | null = null;

  get isEditable() {
    return this.habit?.userId ?? false;
  }

  @Watch("$route", {
    immediate: true,
    deep: true,
  })
  onRouteChanged(value: any, oldValue: any) {
    if (!value) return;
    if (value.params.id) {
      this.habitId = value.params.id;
      this.fetchHabit();
    }
  }

  @Watch("habits", {
    immediate: false,
    deep: true,
  })
  onPropertyChanged(value: any, oldValue: any) {
    if (!value) return;
    this.fetchHabit();
  }

  fetchHabit() {
    if (this.habitId) {
      this.habit = this.getHabit(this.habitId);
    }
  }

  handleUpdate(data: {}) {
    this.updateHabit({ habit: this.habit, data: data });
  }

  handleDelete() {
    this.editDialog = false;
    this.deleteHabitActivities(this.habit!._id);
    this.deleteHabit(this.habit);
    this.$router.push({ name: "home" });
  }
}
</script>
