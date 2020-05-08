<template>
  <div>
    <div v-if="user">
      <!-- User Header -->
      <UserHeader :user="user" @delete="userDeleteSubmit()" />

      <!-- Habit Create -->
      <HabitCreate @submit="habitCreateSubmit($event)" />

      <!-- Habit List -->
      <div v-for="habit in habits" :key="habit.name" class="habits">
        <!-- Habit List Single -->
        <HabitHeader :habit="habit" @delete="habitDeleteSubmit($event)" />
      </div>
    </div>

    <!-- User Create -->
    <UserCreate v-else @submit="userCreateSubmit($event)" />
  </div>
</template>

<script lang="ts">
import { State, Action, Getter } from "vuex-class";

import { UserState, User } from "@/store/user/types";
import UserCreate from "@/components/UserCreate.vue";
import UserHeader from "@/components/UserHeader.vue";

import { HabitState, Habit } from "@/store/user/types";
import HabitCreate from "@/components/HabitCreate.vue";
import HabitHeader from "@/components/HabitHeader.vue";

import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "Home",
  components: {
    HabitCreate,
    HabitHeader,
    UserCreate,
    UserHeader
  },
  computed: {}
})
export default class Home extends Vue {
  // User Store
  @Getter("user", { namespace: "user" }) user: User | undefined;
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;
  @Action("persistUser", { namespace: "user" }) persistUser: any;
  @Action("deleteUser", { namespace: "user" }) deleteUser: any;
  // Habit Store
  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;
  @Action("persistHabit", { namespace: "habit" }) persistHabit: any;
  @Action("deleteHabits", { namespace: "habit" }) deleteHabits: any;

  mounted() {
    this.fetchUser();
    this.fetchHabits();
  }

  habitCreateSubmit(name: string) {
    this.persistHabit({
      name: name
    });
    this.fetchHabits();
  }

  userCreateSubmit(username: string) {
    this.persistUser({
      username: username
    });
    this.fetchUser();
  }

  userDeleteSubmit() {
    this.deleteUser();
    this.deleteHabits();
    this.fetchHabits();
    this.fetchUser();
  }

  habitDeleteSubmit(habit: Habit) {
    // TODO: Implement in vuex, pass id
    // this.deleteHabit(habitId);
    console.log("TODO: delete", habit);
  }
}
</script>
