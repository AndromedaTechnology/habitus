<template>
  <v-container v-if="user && habit">
    <v-row>
      <v-col cols="12" sm="12">
        <!-- Header -->
        <HabitHeader
          class="habitHeader"
          v-if="habit"
          :showStreak="true"
          :habit="habit"
          :activities="getActivities(habit._id)"
        />

        <!-- Edit  -->
        <div class="habitEditContainer mt-4">
          <v-btn medium @click="$refs.editModal.open()" large>Edit</v-btn>
        </div>

        <!--  Activity Chart -->
        <ActivityChart
          v-if="getActivities(habit._id)"
          class="activityChart"
          :habit="habit"
          :activities="getActivities(habit._id)"
        />

        <!-- Activity List -->
        <div class="activityList">
          <ActivityHeader
            v-for="activity in getActivities(habit._id, true)"
            :key="activity._id"
            :activity="activity"
            @delete="activityDeleteSubmit(habit, $event)"
          />
        </div>

        <sweet-modal ref="editModal">
          <v-switch
            v-model="isGood"
            :label="isGood ? 'Good' : 'Bad'"
            :color="isGood ? '#42b983' : '#b94278'"
            solo
          ></v-switch>

          <v-text-field v-model="name" label="Name" solo></v-text-field>

          <v-select
            v-model="amountType"
            :items="[
          { text: 'Points', value: 'amount' },
          { text: 'Time', value: 'timer' },
        ]"
            solo
          ></v-select>

          <div class="my-8">
            <h3>Starts At</h3>
            <datetime class="startsAtDate" v-model="startsAtDate" type="datetime" title="Start at"></datetime>
          </div>

          <!-- Ends At Date -->
          <div class="my-8">
            <h3>Ends At</h3>
            <datetime class="endsAtDate" v-model="endsAtDate" type="datetime" title="Ends at"></datetime>
          </div>

          <v-btn class="delete" @click="habitDeleteSubmit(habit)" block>Delete</v-btn>
        </sweet-modal>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ToggleButton } from "vue-js-toggle-button";
import HabitHeader from "../components/HabitHeader.vue";
import ActivityHeader from "@/components/ActivityHeader.vue";
import ActivityChart from "@/components/ActivityChart.vue";

import { User } from "@/store/user/types";
import { Activity, Activities } from "@/store/activity/types";

import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import { SweetModal } from "sweet-modal-vue";
import { Action, Getter } from "vuex-class";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "Habit",
  components: {
    ToggleButton,
    HabitHeader,
    ActivityChart,
    ActivityHeader,
    Datetime,
    SweetModal
  }
})
export default class Habit extends Vue {
  // User
  @Getter("user", { namespace: "user" }) user: User | undefined;
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;

  // Habits
  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Action("updateHabit", { namespace: "habit" }) updateHabit: any;
  @Action("deleteHabit", { namespace: "habit" }) deleteHabit: any;
  @Getter("getHabit", { namespace: "habit" }) getHabit!: (
    habitId: string
  ) => Promise<Habit | undefined>;
  @Getter("getActivities", { namespace: "activity" }) getActivities:
    | Activities
    | Array<Activity>
    | undefined;

  // Activity
  @Action("fetchActivities", { namespace: "activity" }) fetchActivities: any;
  @Action("deleteHabitActivities", { namespace: "activity" })
  deleteHabitActivities: any;
  @Action("deleteHabitActivity", { namespace: "activity" })
  deleteHabitActivity: any;

  habitId: string | null = null;
  habit: Habit | undefined | null = null;
  startsAtDate: Date | undefined | null = null;
  endsAtDate: Date | undefined | null = null;
  name: string | undefined | null = null;
  isGood: boolean | undefined | null = null;
  amountType: string | undefined | null = null;

  mounted() {
    this.fetchUser();
    this.fetchActivities();
  }

  @Watch("$route", {
    immediate: true,
    deep: true
  })
  onHabitIdChanged(value: any, oldValue: any) {
    if (!value) return;
    if (value.params.id) {
      this.habitId = value.params.id;
    }

    this.fetchHabit();
  }

  @Watch("habits", {
    immediate: false,
    deep: true
  })
  onPropertyChanged(value: any, oldValue: any) {
    if (!value) return;

    this.fetchHabit();
  }

  @Watch("habit", {
    immediate: false,
    deep: true
  })
  habitChanged(value: any, oldValue: any) {
    if (!value) return;
    this.startsAtDate = value.startsAtDate;
    this.endsAtDate = value.endsAtDate;
  }

  @Watch("name", {
    immediate: false,
    deep: true
  })
  nameChanged(value: any, oldValue: any) {
    this.updateHabit({ habit: this.habit, data: { name: value } });
  }

  @Watch("isGood", {
    immediate: false,
    deep: true
  })
  isGoodChanged(value: any, oldValue: any) {
    this.updateHabit({ habit: this.habit, data: { isGood: value } });
  }

  @Watch("startsAtDate", {
    immediate: false,
    deep: true
  })
  startsAtDateChanged(value: any, oldValue: any) {
    this.updateHabit({ habit: this.habit, data: { startsAtDate: value } });
  }

  @Watch("endsAtDate", {
    immediate: false,
    deep: true
  })
  endsAtDateChanged(value: any, oldValue: any) {
    this.updateHabit({ habit: this.habit, data: { endsAtDate: value } });
  }

  @Watch("amountType", {
    immediate: false,
    deep: true
  })
  typeChanged(value: any, oldValue: any) {
    this.updateHabit({ habit: this.habit, data: { amountType: value } });
  }

  fetchHabit() {
    if (this.habitId) {
      this.getHabit(this.habitId).then(resp => {
        this.habit = resp;
        this.startsAtDate = this.habit?.startsAtDate;
        this.endsAtDate = this.habit?.endsAtDate;
        this.amountType = this.habit?.amountType;
        this.name = this.habit?.name;
        this.isGood = this.habit?.isGood;
      });
    }
  }

  activityDeleteSubmit(habit: Habit, activity: Activity) {
    this.deleteHabitActivity({
      habit: habit,
      activity: activity
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
.habitHeader {
  margin-top: 64px;
}

.habitHeader,
.habitEditContainer {
  text-align: center;
}

.activityChart,
.activityList {
  margin-top: 32px;
}
</style>
