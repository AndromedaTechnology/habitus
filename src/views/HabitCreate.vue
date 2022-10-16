<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="8" offset-sm="2" class="pa-8">
        <h1 class="text-center pa-8">Creating new Habit</h1>
        <HabitCreate @submit="submit($event)" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { User } from "@/store/user/types";
import { Action, Getter } from "vuex-class";
import Component from "vue-class-component";
import HabitCreate from "@/components/Habit/HabitCreate.vue";
import { Habit, HabitAmountType } from "@/store/habit/types";
@Component({
  name: "HabitCreateView",
  components: {
    HabitCreate,
  },
})
export default class HabitCreateView extends Vue {
  @Action("persistHabit", { namespace: "habit" }) persistHabit: any;
  @Getter("currentUser", { namespace: "user" }) currentUser: User | undefined;

  submit(data: {
    name: string;
    emoji: string;
    isGood: boolean;
    amountType: HabitAmountType;
  }) {
    this.persistHabit({
      userId: this.currentUser?._id,
      name: data.name,
      emoji: data.emoji,
      isGood: data.isGood,
      amountType: data.amountType,
    }).then((habit: Habit) => {
      this.$router.push({ name: "habit", params: { id: habit._id } });
      // Save Google Analytics Event
      this.$ga.event({
        eventCategory: "habitCreate",
        eventAction: "create",
      });
    });
  }
}
</script>
