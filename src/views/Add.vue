<template>
  <v-container v-if="user">
    <v-row class="mt-12">
      <v-col cols="12" sm="12" class="text-center">
        <h1>Adding activity</h1>
      </v-col>
    </v-row>
    <v-row class="mt-12">
      <v-col cols="12" sm="12">
        <v-combobox
          filled
          v-model="habit"
          :items="habits"
          item-text="name"
          return-object
          clearable
          label="Habit"
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row class="mt-12" v-if="isNewHabit">
      <v-col cols="12" sm="12" md="6" class="sentimentSelector good" @click="isNewHabitGood = true">
        <v-icon v-if="isNewHabitGood === true">check_box</v-icon>
        <v-icon v-else>check_box_outline_blank</v-icon>
        <h3>Good</h3>
      </v-col>
      <v-col cols="12" sm="12" md="6" class="sentimentSelector bad" @click="isNewHabitGood = false">
        <v-icon v-if="isNewHabitGood === false">check_box</v-icon>
        <v-icon v-else>check_box_outline_blank</v-icon>
        <h3>Bad</h3>
      </v-col>
    </v-row>
    <v-row class="mt-12" v-if="habit">
      <v-col cols="12" sm="12">
        <v-btn block @click="save()">Add</v-btn>
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
  isNewHabit: boolean | null = null;
  isNewHabitGood: boolean | null = null;

  mounted() {
    this.fetchUser();
    this.fetchHabits();
  }

  @Watch("habit", {
    immediate: true,
    deep: true
  })
  habitChanged(value: any, oldValue: any) {
    if (typeof value === "string") {
      this.isNewHabit = true;
    } else if (typeof value === "object") {
      this.isNewHabit = false;
    } else {
      this.isNewHabit = null;
    }
  }

  save() {
    if (this.isNewHabit === true) {
      this.persistHabit({
        name: this.habit,
        isGood: this.isNewHabitGood ? true : false,
        amountType: HabitAmountType.amount,
        repeatInSeconds: 0,
        startsAtDate: new Date(),
        endsAtDate: null,
        userId: this.user?._id
      }).then((habit: Habit) => {
        this.habit = habit;
        this.saveActivity();
      });
    } else {
      this.saveActivity();
    }
  }

  saveActivity() {
    this.persistActivity({
      habit: this.habit,
      user: this.user,
      amount: 1
    });

    this.$router.push({ name: "habit", params: { id: this.habit!._id } });
  }
}
</script>

<style lang="scss" scoped>
.sentimentSelector {
  padding: 32px;
  text-align: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: transform 0.2s ease;
  }
  &.good {
    background: #42b983;
  }
  &.bad {
    background: #b94278;
  }
}
</style>
