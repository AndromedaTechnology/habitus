<template>
  <v-container v-if="user">
    <v-row class="mt-12">
      <v-col cols="12" sm="12">
        <v-combobox
          v-model="habit"
          :items="habits"
          item-text="name"
          return-object
          label="Select or enter new Habit name"
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row class="mt-12" v-if="habit">
      <v-col cols="12" sm="12">
        <ActivityCreate :habit="habit" @submit="activityCreateSubmit(habit, user, $event)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { User } from "@/store/user/types";
import { Habit, HabitAmountType } from "@/store/habit/types";

import ActivityCreate from "@/components/ActivityCreate.vue";

import { Action, Getter } from "vuex-class";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "Add",
  components: {
    ActivityCreate
  }
})
export default class Add extends Vue {
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;
  @Getter("user", { namespace: "user" }) user: User | undefined;

  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;
  @Action("persistHabit", { namespace: "habit" }) persistHabit: any;

  @Action("persistActivity", { namespace: "activity" }) persistActivity: any;

  habit: Habit | null = null;

  mounted() {
    this.fetchUser();
    this.fetchHabits();
  }

  @Watch("habit", {
    immediate: true,
    deep: true
  })
  habitChanged(value: any, oldValue: any) {
    if (!value) return;
    if (typeof value === "string") {
      this.persistHabit({
        name: value,
        isGood: true,
        amountType: HabitAmountType.amount,
        repeatInSeconds: 0,
        startsAtDate: new Date(),
        endsAtDate: null,
        userId: this.user?._id
      }).then((habit: Habit) => {
        this.habit = habit;
      });
    }
  }

  activityCreateSubmit(habit: Habit, user: User, amount: number) {
    this.persistActivity({
      habit: habit,
      user: user,
      amount: amount
    });

    this.$router.push({ name: "habit", params: { id: habit._id } });
  }
}
</script>
