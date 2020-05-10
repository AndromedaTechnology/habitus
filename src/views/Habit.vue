<template>
  <div v-if="user && habit">
    <!-- Header -->
    <HabitHeader
      class="habitHeader"
      v-if="habit"
      :habit="habit"
      :activities="habitActivities(habit._id)"
    />

    <!-- Edit  -->
    <div class="habitEditContainer">
      <button class="btn-dark edit" @click="$refs.editModal.open()">
        Edit
      </button>
    </div>

    <!--  Add Activity -->
    <div class="activityCreateContainer">
      <h3>Add Activity</h3>
      <ActivityCreate
        :habit="habit"
        :center="true"
        @submit="activityCreateSubmit(habit._id, user._id, $event)"
      />
    </div>

    <!--  Activity Chart -->
    <ActivityChart
      v-if="heatmapHabitActivities(habit._id)"
      class="activityChart"
      :activities="heatmapHabitActivities(habit._id)"
    />

    <!-- Activity List -->
    <div class="activityList">
      <ActivityHeader
        v-for="activity in habitActivities(habit._id)"
        :key="activity._id"
        :activity="activity"
        @delete="activityDeleteSubmit(habit, $event)"
      />
    </div>

    <sweet-modal ref="editModal">
      <!-- Name -->
      <div class="nameContainer">
        <h3>Name</h3>
        <input type="text" class="input-dark" v-model="name" />
      </div>

      <!-- Type -->
      <div class="typeContainer">
        <h3>Type</h3>
        <select v-model="type">
          <option value="amount">Amount (default)</option>
          <option value="timer">Timer</option>
          <!-- <option value="check">Check</option> -->
        </select>
      </div>

      <!-- Starts At Date -->
      <div class="startsAtDateContainer">
        <h3>Starts At</h3>
        <datetime
          class="startsAtDate"
          v-model="startsAtDate"
          type="datetime"
          title="Start at"
        ></datetime>
      </div>

      <!-- Delete -->
      <div class="deleteContainer">
        <h3>Delete</h3>
        <button class="btn-dark delete" @click="habitDeleteSubmit(habit)">
          Delete
        </button>
      </div>
    </sweet-modal>
  </div>
</template>

<script lang="ts">
import HabitHeader from "../components/HabitHeader.vue";
import ActivityCreate from "@/components/ActivityCreate.vue";
import ActivityHeader from "@/components/ActivityHeader.vue";
import ActivityChart from "@/components/ActivityChart.vue";

import { User } from "@/store/user/types";
import { Activity } from "@/store/activity/types";

import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import { SweetModal } from "sweet-modal-vue";
import { State, Action, Getter, Mutation } from "vuex-class";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "Habit",
  components: {
    HabitHeader,
    ActivityCreate,
    ActivityChart,
    ActivityHeader,
    Datetime,
    SweetModal,
  },
})
export default class Habit extends Vue {
  // User
  @Getter("user", { namespace: "user" }) user: User | undefined;
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;

  // Habits
  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Action("updateHabit", { namespace: "habit" }) updateHabit: any;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;
  @Action("deleteHabit", { namespace: "habit" }) deleteHabit: any;
  @Getter("getHabit", { namespace: "habit" }) getHabit!: (
    habitId: string
  ) => Promise<Habit | undefined>;
  @Getter("habitActivities", { namespace: "activity" }) habitActivities:
    | Array<Activity>
    | undefined;
  @Getter("heatmapHabitActivities", { namespace: "activity" })
  heatmapHabitActivities: Array<Activity> | undefined;

  // Activity
  @Action("persistActivity", { namespace: "activity" }) persistActivity: any;
  @Action("fetchActivities", { namespace: "activity" }) fetchActivities: any;
  @Action("deleteHabitActivities", { namespace: "activity" })
  deleteHabitActivities: any;
  @Action("deleteHabitActivity", { namespace: "activity" })
  deleteHabitActivity: any;

  habitId: string | null = null;
  habit: Habit | undefined | null = null;
  startsAtDate: Date | undefined | null = null;
  name: string | undefined | null = null;
  type: string | undefined | null = null;

  mounted() {
    this.habitId = this.$route.params.id;
    this.fetchHabits();
    this.fetchUser();
    this.fetchActivities();
  }

  @Watch("habits", {
    immediate: false,
    deep: true,
  })
  onPropertyChanged(value: any, oldValue: any) {
    if (!value) return;
    this.fetchHabit();
  }

  @Watch("habit", {
    immediate: false,
    deep: true,
  })
  habitChanged(value: any, oldValue: any) {
    if (!value) return;
    this.startsAtDate = value.startsAtDate;
  }

  @Watch("name", {
    immediate: false,
    deep: true,
  })
  nameChanged(value: any, oldValue: any) {
    this.updateHabit({ habit: this.habit, data: { name: value } });
  }

  @Watch("startsAtDate", {
    immediate: false,
    deep: true,
  })
  startsAtDateChanged(value: any, oldValue: any) {
    this.updateHabit({ habit: this.habit, data: { startsAtDate: value } });
  }

  @Watch("type", {
    immediate: false,
    deep: true,
  })
  typeChanged(value: any, oldValue: any) {
    this.updateHabit({ habit: this.habit, data: { type: value } });
  }

  fetchHabit() {
    if (this.habitId) {
      this.getHabit(this.habitId).then((resp) => {
        this.habit = resp;
        this.startsAtDate = this.habit?.startsAtDate;
        this.type = this.habit?.type;
        this.name = this.habit?.name;
      });
    }
  }

  activityCreateSubmit(habitId: string, userId: string, amount: number) {
    this.persistActivity({
      habitId: habitId,
      userId: userId,
      amount: amount,
    });
    this.fetchActivities();
  }

  activityDeleteSubmit(habit: Habit, activity: Activity) {
    this.deleteHabitActivity({
      habit: habit,
      activity: activity,
    });
    this.fetchActivities();
  }

  habitDeleteSubmit(habit: Habit) {
    this.deleteHabit(habit);
    this.deleteHabitActivities(habit);
    this.$router.push({ name: "home" });
  }
}
</script>

<style lang="scss" scoped>
.habitEditContainer,
.habitHeader {
  text-align: center;
}

.activityCreateContainer {
  text-align: center;
  border-radius: 8px;
  padding: 16px;
  margin-top: 32px;
}

.activityChart,
.activityList {
  margin-top: 32px;
}

button.delete,
.startsAtDateContainer {
  margin-top: 8px;
}
</style>
