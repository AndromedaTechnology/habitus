<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <h1 class="text-center mt-8">Create new Habit</h1>
        <HabitCreate @submit="habitCreateSubmit($event)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Action, Getter } from "vuex-class";
import HabitCreate from "@/components/HabitCreate.vue";
import { HabitAmountType } from "@/store/habit/types";
import { User } from "@/store/user/types";

import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "Home",
  components: {
    HabitCreate
  }
})
export default class Home extends Vue {
  @Action("persistHabit", { namespace: "habit" }) persistHabit: any;
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;
  @Getter("user", { namespace: "user" }) user: User | undefined;

  mounted() {
    this.fetchUser();
  }

  habitCreateSubmit(payload: {
    name: string;
    isGood: boolean;
    amountType: string;
  }) {
    this.persistHabit({
      name: payload.name,
      isGood: payload.isGood,
      amountType: payload.amountType,
      repeatInSeconds: 0,
      startsAtDate: new Date(),
      endsAtDate: null,
      userId: this.user?._id
    });

    this.$router.push({ name: "home" });
  }
}
</script>
