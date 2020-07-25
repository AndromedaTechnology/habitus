<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <h1 class="text-center">Creating new Habit</h1>
        <HabitCreate @submit="submit($event)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import HabitCreate from "@/components/Habit/HabitCreate.vue";

import { Habit, HabitAmountType } from "@/store/habit/types";

import Vue from "vue";
import { Action } from "vuex-class";
import Component from "vue-class-component";

@Component({
  name: "HabitCreateView",
  components: {
    HabitCreate,
  },
})
export default class HabitCreateView extends Vue {
  @Action("persistHabit", { namespace: "habit" }) persistHabit: any;

  submit(data: { name: string; isGood: boolean; amountType: HabitAmountType }) {
    this.persistHabit({
      name: data.name,
      isGood: data.isGood,
      amountType: data.amountType,
    }).then((habit: Habit) => {
      this.$router.push({ name: "habit", params: { id: habit._id } });
    });
  }
}
</script>

<style lang="scss" scoped>
</style>
