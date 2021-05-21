<template>
  <v-container v-if="user" fluid>
    <v-row class="mt-12">
      <v-col :cols="habit ? 8 : 12">
        <v-select
          solo
          v-model="habitListSelected"
          :items="habitList"
          :item-text="itemText"
          return-object
          label="Select a Habit"
          d-inline
        ></v-select>
      </v-col>
      <v-col v-if="habit" :cols="4">
        <v-btn class="pa-6" block @click="saveActivity()">Add</v-btn>
      </v-col>
    </v-row>

    <ActivityEditDialog
      v-if="isDialogVisible"
      :habit="habit"
      :activity="activity"
      :isTemporary="true"
      @closed="hideDialog()"
    />
  </v-container>
</template>
<script lang="ts">
import _ from "lodash";
import { User } from "@/store/user/types";
import { Action, Getter } from "vuex-class";
import { Habit } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";
import { Component, Vue, Watch } from "vue-property-decorator";
import ActivityEditDialog from "@/components/Activity/ActivityEditDialog.vue";
@Component({
  name: "Add",
  components: {
    ActivityEditDialog,
  },
})
export default class Add extends Vue {
  @Getter("user", { namespace: "user" }) user: User | undefined;
  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Getter("getHabit", { namespace: "habit" }) getHabit!: (
    habitId: string
  ) => Habit | null;
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;
  @Action("persistActivity", { namespace: "activity" }) persistActivity: any;

  habit?: Habit;
  activity?: Activity;
  isDialogVisible = false;
  habitListSelected:
    | Habit
    | {
        _id: null;
        name: string;
        isCreateNew: boolean;
      }
    | null = null;

  get habitList(): Array<Habit> {
    const value = this.habits ? _.cloneDeep(this.habits) : [];
    // 'Create new' item
    value.splice(0, 0, {
      name: "Create new!",
      isCreateNew: true,
    });
    return value;
  }

  mounted() {
    this.fetchUser();
    this.fetchHabits();
  }

  @Watch("$route", {
    immediate: true,
    deep: true,
  })
  onRouteChanged(route: any, oldRoute: any) {
    if (route.name === "habit") {
      this.habitListSelected = this.getHabit(route.params.id);
    } else {
      this.habitListSelected = null;
    }
  }

  @Watch("habitListSelected", {
    immediate: true,
    deep: true,
  })
  habitListSelectedChanged(value: any, oldValue: any) {
    this.$nextTick(() => {
      if (value) {
        if (value.isCreateNew) {
          this.habit = undefined;
          if (this.$router.currentRoute.name !== "habitCreate") {
            this.$router.push({ name: "habitCreate" });
          }
          this.habitListSelected = null;
        } else if (value._id) {
          this.habit = value;
          this.redirectToHabit(value);
        }
      } else {
        this.habit = undefined;
      }
    });
  }
  @Watch("habits", {
    deep: true,
    immediate: false,
  })
  onHabitsChanged(value: any, oldValue: any) {
    if (!value) return;
    const habitId = this.habitListSelected ? this.habitListSelected._id : null;
    if (habitId) {
      this.habitListSelected = this.getHabit(habitId);
    }
  }
  itemText(item: Habit): string {
    return `${item.emoji ?? ""} ${item.name ?? ""}`;
  }
  saveActivity() {
    this.persistActivity({
      habit: this.habit,
      user: this.user,
      amount: 1,
    }).then((activity: Activity) => {
      this.activity = activity;
      this.showDialog();
      this.playSoundNotification(this.habit?.isGood);
    });

    this.redirectToHabit(this.habit!);
  }
  showDialog() {
    this.isDialogVisible = true;
  }
  hideDialog() {
    this.isDialogVisible = false;
    this.activity = undefined;
  }
  playSoundNotification(isGood = true) {
    if (isGood) {
      const audio = new Audio("/audio/notificationGood.ogg");
      audio.play();
    } else {
      const audio = new Audio("/audio/notificationBad.ogg");
      audio.play();
    }
  }
  redirectToHabit(habit: Habit) {
    if (
      this.$router.currentRoute.name !== "habit" ||
      this.$router.currentRoute.params.id !== habit._id
    ) {
      this.$router.push({ name: "habit", params: { id: habit._id } });
    }
  }
}
</script>
