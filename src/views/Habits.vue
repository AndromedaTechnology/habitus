<template>
  <v-container v-if="user">
    <v-row>
      <v-col cols="12" sm="12">
        <HabitList :habits="habits" :user="user" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Habit } from "@/store/habit/types";
import { User } from "@/store/user/types";

import HabitList from "@/components/HabitList.vue";

import Vue from "vue";
import { Action, Getter } from "vuex-class";
import Component from "vue-class-component";

@Component({
  name: "Habits",
  components: {
    HabitList
  }
})
export default class Habits extends Vue {
  // User Store
  @Getter("user", { namespace: "user" }) user: User | undefined;
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;

  // Habit Store
  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;

  mounted() {
    this.fetchUser();
    this.fetchHabits();
  }
}
</script>

<style lang="scss" scoped>
</style>
